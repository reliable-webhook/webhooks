<template>
  <table class="table-fixed w-full">
    <thead class="text-xs font-semibold uppercase text-gray-500 dark:text-dark-50">
      <tr class="flex w-full px-2 sm:px-6 border-b dark:border-dark-600">
        <th class="p-2 pl-0 w-1/5 sm:w-20 whitespace-nowrap">
          <div class="font-semibold text-left">
            Status
          </div>
        </th>
        <th
          class="p-2 w-2/4 sm:w-[calc(100%_-_11rem)]"
          :class="{ 'mr-[-10px]': !!$vscode }"
        >
          <div class="font-semibold text-left">
            Body
          </div>
        </th>
        <th class="p-2 pr-0 w-1/4 sm:w-24 whitespace-nowrap">
          <div class="font-semibold text-left">
            Received At
          </div>
        </th>
      </tr>
    </thead>
    <tbody
      ref="rowsContainerRef"
      class="text-sm divide-y divide-gray-100 dark:divide-dark-600 block overflow-y-scroll w-full"
      :style="tableBodyContainerStyles"
    >
      <WebhookEntriesTableRow
        v-for="entry in entries"
        :key="entry.id"
        :entry="entry"
        :selected="entry === selectedEntry"
        @click="handleEntryClick"
      />
      <tr
        v-if="loading"
        :class="loading ? 'text-gray-300' : 'text-gray-500'"
        class="p-2 flex items-center justify-center text-gray-500 font-medium hover:bg-gray-100 focus:bg-gray-100 hover:text-gray-700 focus:text-gray-700 cursor-pointer"
        @click="handleLoadMore"
      >
        <SpinnerIcon
          v-if="loading"
          class="mr-2"
        />
        {{ loading ? 'Loading...' : '' }}
      </tr>
    </tbody>
  </table>
</template>

<script>
import { SpinnerIcon } from 'icons'
import WebhookEntriesTableRow from './TableRow'

export default {
  name: 'WebhookEntriesTable',
  components: {
    WebhookEntriesTableRow,
    SpinnerIcon
  },
  props: {
    entries: {
      default: () => [],
      required: false,
      type: Array
    },
    loading: {
      default: false,
      type: Boolean
    },
    heightOffset: {
      type: Number,
      required: true
    }
  },
  emits: ['selectedEntry', 'loadMore', 'scroll'],
  data () {
    return {
      selectedEntry: {}
    }
  },
  computed: {
    tableBodyContainerStyles () {
      if (this.heightOffset) {
        return { height: `calc(100vh - ${this.heightOffset}px - 32px)` }
      } else {
        return {}
      }
    }
  },
  mounted () {
    this.$refs.rowsContainerRef.addEventListener('scroll', (e) => {
      const { scrollTop, clientHeight, scrollHeight } = this.$refs.rowsContainerRef

      if (scrollTop + clientHeight >= scrollHeight) {
        this.$emit('loadMore')
      }

      this.$emit('scroll', e)
    })
  },
  beforeUnmount () {
    this.$refs.rowsContainerRef.removeEventListener('scroll')
  },
  methods: {
    handleEntryClick (entry) {
      this.selectedEntry = entry
      this.$emit('selectedEntry', entry)
    }
  }
}
</script>
