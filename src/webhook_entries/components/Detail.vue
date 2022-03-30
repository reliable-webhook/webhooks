<template>
  <div class="block w-full">
    <div class="flex pl-4 pr-2 py-2 border-b dark:border-dark-600 items-center justify-between space-x-1">
      <div class="flex items-center space-x-2 overflow-hidden">
        <EntryStatusTag
          v-if="entry.status"
          :value="entry.status"
        />
        <h2 class="flex-auto text-lg font-semibold text-gray-600 dark:text-dark-50 truncate">
          {{ entry.id }}
        </h2>
      </div>
      <div class="flex space-x-2 justify-end">
        <UIButton
          v-if="entry.status == 'failed'"
          size="small"
          color-type="black"
          icon="RotateIcon"
          @click="retry"
        >
          Retry
        </UIButton>
        <DirectSendDropdown
          v-else
          :project="project"
          @click="manualTriggerRequest"
        />
        <UIButton
          size="small"
          color-type="red"
          icon="TrashIcon"
          @click="removeEntry"
        >
          Remove
        </UIButton>
      </div>
    </div>
    <div class="flex h-[calc(100%_-_49px)]">
      <div class="flex-auto divide-y">
        <div
          v-if="detailedEntry.id"
          class="text-gray-500 dark:text-dark-50"
        >
          <div class="border-b dark:border-dark-600 py-1 pl-4 flex justify-between items-center">
            <span class="text-xs font-semibold uppercase mt-[1px]">
              Headers
            </span>
            <button
              class="float-right hover:text-gray-900 dark:hover:text-white focus:text-gray-900 focus:outline-none focus:shadow-outline cursor-pointer mr-1"
              @click="copyHeaders"
            >
              <CopyIcon class="w-5 h-5" />
            </button>
          </div>
          <div
            class="h-32 overflow-y-auto pl-4 pt-2"
          >
            <ResponseHighlight :code="JSON.stringify(detailedEntry.headers, null, 2)" />
          </div>
        </div>
        <div
          v-if="detailedEntry.id"
          class="h-[calc(100%_-_158px)] dark:border-dark-600 text-gray-500 dark:text-dark-50"
        >
          <div class="border-b dark:border-dark-600 py-1 pl-4 flex justify-between items-center">
            <span class="text-xs font-semibold uppercase mt-[1px]">
              Body
            </span>

            <button
              class="float-right hover:text-gray-900 dark:hover:text-white focus:text-gray-900 focus:outline-none focus:shadow-outline cursor-pointer mr-1"
              @click="copyBody"
            >
              <CopyIcon class="w-5 h-5" />
            </button>
          </div>
          <div class="pl-4 pt-2 overflow-y-auto h-[calc(100%_-_29px)]">
            <ResponseHighlight
              class="h-full"
              :code="detailedEntry.body"
            />
          </div>
        </div>
      </div>
      <div
        v-if="detailedEntry.id"
        class="flex-none border-l dark:border-dark-600"
      >
        <div class="px-2 text-md border-b dark:border-dark-600 py-1 flex items-center h-[29px]">
          <span class="text-xs font-semibold uppercase text-gray-500 dark:text-dark-50 mt-[1px]">
            Events
          </span>
        </div>
        <div class="space-y-2 px-2 pb-1 overflow-y-auto h-[calc(100%_-_30px)] pt-2">
          <EventTypeTag
            v-for="event in detailedEntry.events"
            :key="event.id"
            class="block w-full text-center"
            :event="event"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from 'api'
import { localRequest } from 'application/scripts/local_request'
import { removeSubscription, subscribeToWebhookEvents } from 'application/scripts/subscriptions'
import ResponseHighlight from 'ui/components/ResponseHighlight'
import EventTypeTag from './EventTypeTag'
import EntryStatusTag from './StatusTag'
import DirectSendDropdown from './SendDropdown'
import { CopyIcon } from 'icons'

const LOCALHOST_URL_REGEXP = /^https?:\/\/(?:localhost|0.0.0.0|127.0.0.1)/

export default {
  name: 'WebhookEntryDetail',
  components: {
    ResponseHighlight,
    EntryStatusTag,
    EventTypeTag,
    DirectSendDropdown,
    CopyIcon
  },
  props: {
    entryId: {
      type: String,
      required: true
    },
    entry: {
      type: Object,
      required: true
    },
    project: {
      type: Object,
      required: true
    }
  },
  emits: ['remove'],
  data () {
    return {
      detailedEntry: { events: [] }
    }
  },
  watch: {
    entryId () {
      if (this.subscription) {
        removeSubscription(this.subscription)
      }

      if (this.entryId) {
        this.loadEntry()

        this.subscription = subscribeToWebhookEvents(this.entryId, this.processEvent)
      }
    }
  },
  mounted () {
    this.loadEntry()

    this.subscription = subscribeToWebhookEvents(this.entryId, this.processEvent)
  },
  methods: {
    processEvent ([action, data]) {
      const existingEvent = this.detailedEntry.events.find((event) => event.id === data.id)

      if (!existingEvent && action === 'new') {
        this.detailedEntry.events.unshift(data)
      } else {
        Object.assign(existingEvent, data)
      }
    },
    loadEntry () {
      api.get(`webhook_entries/${this.entryId}`).then((result) => {
        this.detailedEntry = result.data.data
        this.detailedEntry.events = [...this.detailedEntry.events].sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
      })
    },
    retry () {
      this.triggerRequests()

      this.$alerts.success('Retry request has been sent')
    },
    triggerRequests () {
      if (this.project) {
        return this.project.recipients.forEach((recipient) => {
          if (recipient.status === 'enabled') {
            this.triggerRequest(this.detailedEntry, recipient)
          }
        })
      }
    },
    triggerRequest (entry, recipient) {
      if (recipient.url.match(LOCALHOST_URL_REGEXP)) {
        return this.sendLocalRequest(entry, recipient, entry.body)
      } else {
        return api.post(`webhook_entries/${entry.id}/send`, {
          webhook_recipient_id: recipient.id
        }).then((result) => {
        }).catch((error) => {
          console.error(error)
        })
      }
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
    removeEntry () {
      this.$emit('remove', this.entry)

      this.$alerts.success('Removed')

      return api.delete(`webhook_entries/${this.detailedEntry.id}`).then((result) => {
      }).catch((error) => {
        console.error(error)
      })
    },
    copyBody () {
      navigator.clipboard.writeText(this.detailedEntry.body)

      this.$alerts.success('Copied')
    },
    copyHeaders () {
      navigator.clipboard.writeText(JSON.stringify(this.detailedEntry.headers))

      this.$alerts.success('Copied')
    },
    manualTriggerRequest (recipient) {
      this.triggerRequest(this.detailedEntry, recipient)

      this.$alerts.success('Request has been sent')
    }
  }
}
</script>
