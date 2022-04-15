<template>
  <UIModal
    :visible="visible"
    size="large"
    title="WARNING"
    :with-cancel="false"
    :confirm-text="'OK'"
    @confirm="onApprove"
  >
    <p class="mb-4 font-light text-gray-900 dark:text-dark-50">
      Web version doesn't support PUT, PATCH, DELETE methods because of CORS.
      Please, use VS Code extension or Desktop application instead.
    </p>

    <div class="flex space-x-3 mb-4">
      <a
        href="https://marketplace.visualstudio.com/items?itemName=ReliableWebhook.ReliableWebhook"
        data-turbolinks="false"
        class="flex w-full items-center justify-center h-[45px] px-5 py-3 focus:outline-none border border-transparent text-base font-medium rounded-md text-gray-700 dark:text-dark-50 border-gray-100 dark:border-dark-600 bg-gray-100 dark:bg-dark-700"
      >
        <PuzzleIcon class="mr-2" />
        <span>VS Code</span>
      </a>
      <a
        href="https://github.com/reliable-webhook/webhooks/releases/tag/latest"
        data-turbolinks="false"
        class="flex w-full items-center justify-center h-[45px] px-5 py-3 focus:outline-none border border-transparent text-base font-medium rounded-md text-gray-700 dark:text-dark-50 border-gray-100 dark:border-dark-600 bg-gray-100 dark:bg-dark-700"
      >
        <DeviceDesktopIcon class="mr-2" />
        <span>Desktop</span>
      </a>
    </div>
  </UIModal>
</template>

<script>
import { PuzzleIcon, DeviceDesktopIcon } from 'icons'

export default {
  name: 'CorsWarningModal',
  components: {
    PuzzleIcon,
    DeviceDesktopIcon
  },
  props: {
    note: {
      type: String,
      required: false,
      default: ''
    }
  },
  emits: ['success'],
  data () {
    return {
      visible: false
    }
  },
  methods: {
    show () {
      this.visible = true
    },
    onApprove () {
      this.$emit('success')
    }
  }
}
</script>
