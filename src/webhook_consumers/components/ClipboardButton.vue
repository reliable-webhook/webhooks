<template>
  <button
    class="hover:text-gray-900 dark:hover:text-white cursor-pointer"
    @click="handleClickCopy"
  >
    <CopyIcon class="w-5 h-5" />
  </button>
</template>
<script>
import { CopyIcon } from 'icons'

export default {
  name: 'ConsumerClipboardButton',
  components: {
    CopyIcon
  },
  props: {
    consumer: {
      type: Object,
      required: true
    }
  },
  emits: ['successSubmit'],
  data () {
    return {
      isSubmitting: false
    }
  },
  methods: {
    handleClickCopy () {
      if (navigator.clipboard) {
        navigator.clipboard.writeText(this.consumer.url)

        this.$alerts.success('Copied')
      }
    }
  }
}
</script>
