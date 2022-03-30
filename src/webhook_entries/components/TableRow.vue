<template>
  <tr
    :class="selected ? 'bg-gray-100 dark:bg-dark-700' : ''"
    class="px-2 sm:px-6 flex items-center text-gray-500 dark:text-dark-50 justify-between w-full hover:bg-gray-100 dark:hover:bg-dark-700 focus:bg-gray-100 cursor-pointer"
    @click="handleContainerClick"
  >
    <td class="p-2 pl-0 w-1/5 sm:w-20 whitespace">
      <EntryStatusTag :value="entry.status" />
    </td>
    <td class="p-2 w-2/4 sm:w-[calc(100%_-_11rem)]">
      <div class="text-left text-xs font-mono truncate">
        {{ entry.truncated_body }}
      </div>
    </td>
    <td class="p-2 pr-0 w-1/4 sm:w-24 break-words">
      <div class="text-left wrap font-sm">
        {{ formattedReceivedAt }}
      </div>
    </td>
  </tr>
</template>

<script>

import EntryStatusTag from './StatusTag'

export default {
  name: 'WebhookEntriesTableRow',
  components: {
    EntryStatusTag
  },
  props: {
    entry: {
      type: Object,
      required: true
    },
    selected: {
      default: false,
      type: Boolean
    }
  },
  emits: ['click'],
  computed: {
    formattedReceivedAt () {
      if (this.entry.received_at) {
        const receivedAtDate = new Date(this.entry.received_at)
        const currentDate = new Date()
        let dateFormatOptions = null

        if (receivedAtDate.toDateString() === currentDate.toDateString()) {
          dateFormatOptions = { hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true }
        } else {
          dateFormatOptions = { day: 'numeric', month: 'short', year: 'numeric' }
        }

        return new Intl.DateTimeFormat('en-us', dateFormatOptions).format(receivedAtDate)
      } else {
        return 'None'
      }
    }
  },
  methods: {
    handleContainerClick () {
      this.$emit('click', this.entry)
    }
  }
}
</script>
