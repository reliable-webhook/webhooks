<template>
  <div class="border-2 border-grey-500 p-3 bg-white m-auto relative">
    <div class="w-full h-full text-center">
      <div class="flex h-full flex-col justify-between">
        <ZoomQuestionIcon class="mt-4 w-16 h-16 m-auto text-gray-800" />
        <p
          v-if="title"
          class="text-gray-900 text-lg mt-4"
        >
          {{ title }}
        </p>
        <p
          v-if="subTitle"
          class="text-gray-700 text-sm font-thin py-2 px-6"
        >
          {{ subTitle }}
        </p>
        <div class="p-1 flex items-center justify-center w-full">
          <slot />
        </div>
      </div>
    </div>
  </div>
</template>
<script>

import { ZoomQuestionIcon } from 'icons'

export default {
  name: 'UINoDataPlaceholder',
  components: {
    ZoomQuestionIcon
  },
  props: {
    title: {
      default: 'No date',
      type: String
    },
    subTitle: {
      type: String,
      required: false,
      default: ''
    }
  }
}
</script>
