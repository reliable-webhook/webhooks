<template>
  <transition
    enter-active-class="transition duration-200 ease-out"
    enter-from-class="translate-y-1 opacity-0"
    enter-to-class="translate-y-0 opacity-100"
    leave-active-class="transition duration-150 ease-in"
    leave-from-class="translate-y-0 opacity-100"
    leave-to-class="translate-y-1 opacity-0"
  >
    <span
      v-if="message"
      :class="[textClasses, typeClasses, 'flex items-center justify-start px-2 py-1 text-sm font-light text-gray-700']"
    >
      <component
        :is="iconComponentName"
        class="w-5 h-5 mr-1"
      />
      {{ message }}
    </span>
  </transition>
</template>

<script>
import { CircleCheckIcon, InfoCircleIcon, AlertCircleIcon } from 'icons'

export default {
  name: 'UIAlert',
  components: {
    CircleCheckIcon,
    InfoCircleIcon,
    AlertCircleIcon
  },
  props: {
    message: {
      type: String,
      required: false,
      default: ''
    },
    type: {
      type: String,
      default: 'info'
    }
  },
  computed: {
    typeClasses () {
      const typeClasses = {
        success: 'bg-green-100 dark:bg-green-900',
        info: 'bg-blue-100 dark:bg-green-900',
        error: 'bg-red-100 dark:bg-green-900'
      }

      return typeClasses[this.$props.type] || typeClasses.info
    },
    textClasses () {
      const iconClasses = {
        success: 'text-green-600 dark:text-green-400',
        info: 'text-blue-600 dark:text-blue-400',
        error: 'text-red-600 dark:text-red-400'
      }

      return iconClasses[this.$props.type] || iconClasses.info
    },
    iconComponentName () {
      const iconComponentNames = {
        success: 'CircleCheckIcon',
        info: 'InfoCircleIcon',
        error: 'AlertCircleIcon'
      }

      return iconComponentNames[this.$props.type] || iconComponentNames.info
    }
  }
}
</script>
