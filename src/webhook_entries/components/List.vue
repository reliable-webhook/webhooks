<template>
  <div
    ref="componentContainerRef"
  >
    <div ref="filtersContainerRef">
      <WebhookEntriesFilters
        ref="filtersComponent"
        :is-live-update="isLiveUpdate"
        @change="handleFiltersChange"
        @live-update-toggle="toggleLiveUpdate"
      />
    </div>
    <div
      ref="entriesContainerRefRef"
      class="flex border-t h-full dark:border-dark-600"
    >
      <div
        class="h-full"
        :class="selectedEntry?.id ? 'w-1/2' : 'w-full'"
      >
        <WebhookEntriesTable
          v-show="entries.length"
          :loading="isLoading"
          :entries="entries"
          class="h-full"
          :height-offset="heightOffset"
          @loadMore="handleLoadMoreEntries"
          @scroll="maybeToggleLiveUpdate"
          @selectedEntry="handleSelectEntry"
        />
        <template v-if="!entries.length">
          <div
            v-if="!isLoading && isWithFilters"
            class="flex justify-center flex-col items-center mt-4"
          >
            <div class="text-gray-800 dark:text-dark-50">
              Not found
            </div>
            <div class="mt-3">
              <UIButton
                size="small"
                @click="onClearFiltersClick"
              >
                Clear Filters
              </UIButton>
            </div>
          </div>
          <div
            v-else-if="!isLoading"
            class="text-center mt-5"
          >
            <code
              class="cursor-pointer text-gray-800 dark:text-dark-50"
              @click="copyCurlSnippet"
            >
              {{ curlSnippet }}
            </code>
          </div>
        </template>
      </div>
      <div
        v-if="selectedEntry"
        class="border-l w-1/2 h-full dark:border-dark-600"
        :style="{ height: `calc(100vh - ${heightOffset}px)`}"
      >
        <WebhookEntryDetail
          v-if="selectedEntry?.id"
          :project="project"
          :entry-id="selectedEntry.id"
          :entry="selectedEntry"
          class="h-full"
          @remove="handleEntryRemove"
        />
      </div>
    </div>
  </div>
</template>

<script>
import api from 'api'
import WebhookEntriesTable from './Table'
import WebhookEntryDetail from './Detail'
import WebhookEntriesFilters from './Filters'
import { removeSubscription, subscribeToWebhookEntries } from 'application/scripts/subscriptions'
import { localRequest } from 'application/scripts/local_request'

const LOCALHOST_URL_REGEXP = /^https?:\/\/(?:localhost|0.0.0.0|127.0.0.1)/

export default {
  name: 'WebhookEntries',
  components: {
    WebhookEntryDetail,
    WebhookEntriesTable,
    WebhookEntriesFilters
  },
  props: {
    project: {
      type: Object,
      required: true
    },
    heightOffset: {
      type: Number,
      required: false,
      default: 0
    }
  },
  data () {
    return {
      isLoading: false,
      entries: [],
      isLoadedAll: false,
      pausedEntries: [],
      filters: {},
      isLiveUpdate: true,
      selectedEntry: null
    }
  },
  computed: {
    curlSnippet () {
      return `curl -X POST -d 'test' ${this.project.consumers[0]?.url}`
    },
    filterQueryParams () {
      return {
        q: this.filters.searchText,
        statuses: this.filters.statuses,
        time_range: this.filters.timeRange
      }
    },
    isWithFilters () {
      return this.filters.searchText || this.filters.statuses?.length || this.filters.timeRange?.length
    }
  },
  watch: {
    project () {
      if (this.project) {
        this.resubscribe()
        this.loadEntries()
        this.selectedEntry = null
      }
    }
  },
  mounted () {
    this.loadEntries()
    this.subscription ||= subscribeToWebhookEntries(this.project.id, this.processEvent)
  },
  beforeUnmount () {
    removeSubscription(this.subscription)
  },
  methods: {
    resubscribe () {
      removeSubscription(this.subscription)

      this.subscription = subscribeToWebhookEntries(this.project.id, this.processEvent)
    },
    toggleLiveUpdate () {
      this.isLiveUpdate = !this.isLiveUpdate

      if (this.isLiveUpdate) {
        this.prependPausedEntries()
      }
    },
    maybeToggleLiveUpdate (event) {
      if (!this.isWithFilters) {
        if (event.target.scrollTop > 0) {
          this.isLiveUpdate = false
        } else {
          if (!this.isLiveUpdate) {
            this.prependPausedEntries()
          }

          this.isLiveUpdate = true
        }
      }
    },
    loadEntries ({ append } = { append: false }) {
      if (!this.isLoading) {
        this.isLoading = true

        return api.get(`projects/${this.project.id}/webhook_entries`, {
          params: {
            ...(append ? { after: this.entries[this.entries.length - 1]?.created_at } : {}),
            ...this.filterQueryParams
          }
        }).then((result) => {
          if (append) {
            this.entries.push(...result.data.data)
          } else {
            this.entries = result.data.data

            this.isLoadedAll = false

            if (!this.entries.find((e) => e.id === this.selectedEntry?.id)) {
              this.selectedEntry = null
            }
          }

          if (result.data.data.length === 0) {
            this.isLoadedAll = true
          }
        }).catch((error) => {
          console.error(error)
        }).finally(() => {
          this.isLoading = false
        })
      }
    },
    processEvent ([action, data]) {
      const existingEntry =
        this.entries.find((entry) => entry.id === data.id) || this.pausedEntries.find((entry) => entry.id === data.id)

      if (!existingEntry && action === 'new') {
        if (this.isLiveUpdate) {
          this.entries.unshift(data)
        } else {
          this.pausedEntries.unshift(data)
        }

        const recipients = this.project.recipients.filter((recipient) => {
          return recipient.status === 'enabled' && recipient.url.match(LOCALHOST_URL_REGEXP)
        })

        recipients.forEach((recipient) => {
          api.get(`webhook_entries/${data.id}`).then((result) => {
            this.sendLocalRequest(result.data.data, recipient, result.data.data.body)
          })
        })
      } else if (existingEntry) {
        Object.assign(existingEntry, data)
      }
    },
    handleSelectEntry (entry) {
      this.selectedEntry = entry
    },
    prependPausedEntries () {
      this.entries.unshift(...this.pausedEntries)
      this.pausedEntries = []
    },
    sendLocalRequest (entry, recipient, data) {
      return localRequest(entry, recipient, data).then((xhr) => {
        return api.post('webhook_events', {
          data: {
            webhook_entry_id: entry.id,
            project_id: recipient.project_id,
            source_id: recipient.id,
            event_type: 'deliver'
          }
        }).catch((error) => {
          console.error(error)
        })
      }).catch((xhr) => {
        return api.post('webhook_events', {
          data: {
            webhook_entry_id: entry.id,
            project_id: recipient.project_id,
            source_id: recipient.id,
            event_type: 'fail',
            data: { status: xhr.status }
          }
        }).catch((error) => {
          console.error(error)
        })
      })
    },
    handleEntryRemove (removedEntry) {
      if (this.selectedEntry?.id === removedEntry?.id) {
        this.selectedEntry = null
        this.entries = this.entries.filter(entry => entry.id?.toString() !== removedEntry?.id?.toString())
      }
    },
    handleLoadMoreEntries () {
      if (!this.isLoadedAll) {
        this.loadEntries({ append: true })
      }
    },
    onClearFiltersClick () {
      this.$refs.filtersComponent.handleReset()
    },
    copyCurlSnippet () {
      navigator.clipboard.writeText(this.curlSnippet)

      this.$alerts.success('Copied')
    },
    handleFiltersChange (filters) {
      this.filters = filters

      this.loadEntries()

      if (this.isWithFilters) {
        this.isLiveUpdate = false
      } else {
        this.isLiveUpdate = true
      }
    }
  }
}
</script>
