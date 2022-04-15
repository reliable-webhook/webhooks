<template>
  <span :class="[colorClasses, 'px-2 text-[12px] leading-4 font-md rounded uppercase']">{{ formattedText }}</span>
</template>
<script>
export default {
  name: 'EventTypeTag',
  components: {
  },
  props: {
    event: {
      type: Object,
      required: true
    }
  },
  computed: {
    colorClasses () {
      const colorClasses = {
        accept: 'bg-lime-200 dark:bg-lime-900 text-lime-600 dark:text-lime-500',
        process: 'bg-amber-200 dark:bg-amber-900 text-amber-600 dark:text-amber-400',
        send: 'bg-blue-200 dark:bg-blue-900 text-blue-600 dark:text-blue-400',
        deliver: 'bg-green-200 dark:bg-green-900 text-green-600 dark:text-green-400',
        retry: 'bg-violet-200 dark:bg-violet-900 text-violet-600 dark:text-violet-400',
        fail: 'bg-rose-200 dark:bg-rose-900 text-rose-600 dark:text-rose-400',
        consume: 'bg-pink-200 dark:bg-pink-900 text-pink-600 dark:text-pink-400'
      }

      return colorClasses[this.$props.event.event_type] || colorClasses.accept
    },
    eventLabelsMap () {
      return {
        accept: 'Accepted',
        process: 'Processed',
        send: 'Sent',
        deliver: 'Delivered',
        retry: 'Retried',
        fail: 'Failed',
        consume: 'Consumed'
      }
    },
    formattedText () {
      const label = this.eventLabelsMap[this.event.event_type]

      if (this.event.attempt > 0) {
        return `${label} (${this.event.attempt})`
      } else {
        return label
      }
    }
  }
}
</script>
