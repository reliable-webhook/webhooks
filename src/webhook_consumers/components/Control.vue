<template>
  <div class="group w-full p-2 rounded-sm bg-gray-100 hover:bg-gray-200 transition ease-in duration-100 hover:cursor-pointer dark:bg-dark-700 text-gray-700 dark:text-dark-50">
    <div class="h-6 flex items-center justify-between">
      <div
        class="text-sm font-light break-all"
        @click="copy"
      >
        {{ consumer.url }}
      </div>
      <div class="hidden right-0 group-hover:flex items-center justify-start space-x-1">
        <ConsumerDeleteButton
          :consumer="consumer"
          @successSubmit="handleSuccessDelete"
        />
        <ConsumerClipboardButton :consumer="consumer" />
      </div>
    </div>
  </div>
</template>
<script>
import { removeProjectConsumer } from 'application/scripts/global_store'
import ConsumerDeleteButton from './DeleteButton'
import ConsumerClipboardButton from './ClipboardButton'

export default {
  name: 'ConsumerControl',
  components: {
    ConsumerDeleteButton,
    ConsumerClipboardButton
  },
  props: {
    consumer: {
      type: Object,
      required: true
    }
  },
  emits: ['remove'],
  methods: {
    copy () {
      if (navigator.clipboard) {
        navigator.clipboard.writeText(this.consumer.url)

        this.$alerts.success('Copied')
      }
    },
    handleSuccessDelete (deletedConsumer) {
      removeProjectConsumer(deletedConsumer)

      this.$emit('remove')
    }
  }
}
</script>
