<template>
  <span :class="[colorClasses, 'px-2 text-[12px] leading-4 font-md rounded uppercase']">{{ value }}</span>
</template>
<script>
export default {
  name: 'EntryStatusTag',
  props: {
    value: {
      type: String,
      required: true
    }
  },
  computed: {
    colorClasses () {
      const colorClasses = {
        accepted: 'bg-amber-200 text-amber-600 dark:bg-abmer-900 dark:text-amber-700',
        sent: 'bg-blue-200 text-blue-600 dark:bg-blue-900 dark:text-blue-400',
        delivered: 'bg-green-200 text-green-600 dark:bg-green-900 dark:text-green-500',
        failed: 'bg-rose-200 text-rose-600 dark:bg-rose-900 dark:text-rose-400'
      }

      return colorClasses[this.$props.value] || colorClasses.accepted
    }
  }
}
</script>
