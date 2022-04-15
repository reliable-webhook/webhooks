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
        accepted: 'bg-lime-200 dark:bg-lime-900 text-lime-600 dark:text-lime-500',
        sent: 'bg-blue-200 dark:bg-blue-900 text-blue-600 dark:text-blue-400',
        delivered: 'bg-green-200 dark:bg-green-900 text-green-600  dark:text-green-500',
        failed: 'bg-rose-200 dark:bg-rose-900 text-rose-600 dark:text-rose-400'
      }

      return colorClasses[this.$props.value] || colorClasses.accepted
    }
  }
}
</script>
