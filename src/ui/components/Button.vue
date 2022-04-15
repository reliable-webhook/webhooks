<template>
  <component
    :is="href ? 'a' : 'button'"
    :disabled="disabled"
    :href="href"
    :target="target"
    :class="[disableClasses, sizeClasses, borderClasses, colorClasses, 'flex justify-center h-fit items-center gap-1 font-medium whitespace-nowrap transition ease-in duration-200 focus:outline-none']"
  >
    <SpinnerIcon
      v-if="loading"
      class="mr-2"
    />
    <component
      :is="icon"
      v-if="!loading && icon"
      class="h-5 w-5"
    />
    <slot />
  </component>
</template>

<script>
import { SpinnerIcon, PlusIcon, RotateIcon, TrashIcon, TwitterIcon, EmailIcon, GithubIcon } from 'icons'

export default {
  name: 'UIButton',
  components: {
    SpinnerIcon,
    PlusIcon,
    RotateIcon,
    TwitterIcon,
    TrashIcon,
    EmailIcon,
    GithubIcon
  },
  props: {
    icon: {
      type: String,
      required: false,
      default: ''
    },
    loading: {
      type: Boolean,
      default: false
    },
    href: {
      type: String,
      required: false,
      default: ''
    },
    target: {
      type: String,
      required: false,
      default: ''
    },
    colorType: {
      type: String,
      required: false,
      default: 'white'
    },
    borderType: {
      type: String,
      required: false,
      default: ''
    },
    disabled: {
      type: Boolean,
      required: false,
      default: false
    },
    size: {
      type: String,
      required: false,
      default: 'medium'
    }
  },
  computed: {
    colorClasses () {
      const colorClasses = {
        white: 'bg-white dark:bg-dark-600 text-grey-900 dark:text-dark-50 hover:bg-gray-100 dark:hover:bg-dark-700 border-gray-500 dark:border-dark-600 dark:hover:text-gray-200',
        black: 'bg-gray-700 text-white border-gray-700 hover:bg-black dark:hover:bg-dark-700 hover:border-black dark:hover:border-dark-700',
        red: 'bg-red-500 dark:bg-red-800 text-white hover:bg-red-700 dark:hover:bg-red-700 border-red-500 dark:border-red-800 hover:border-red-700 dark:hover:border-red-700 dark:hover:text-white',
        gray: 'bg-white dark:bg-dark-600 text-gray-500 dark:text-dark-50 hover:bg-gray-100 dark:hover:bg-dark-700 border-gray-300 dark:border-dark-600 dark:hover:text-gray-100'
      }

      return colorClasses[this.$props.colorType] || colorClasses.white
    },
    disableClasses () {
      if (this.$props.disabled) {
        return 'opacity-50 pointer-events-none'
      } else {
        return null
      }
    },
    borderClasses () {
      const borderClasses = {
        none: 'border-2 border-none',
        solid: 'border-2 border-solid',
        dashed: 'border border-dashed'
      }

      return borderClasses[this.$props.borderType] || borderClasses.solid
    },
    sizeClasses () {
      const sizeClasses = {
        small: 'text-sm px-2 py-1',
        medium: 'text-sm px-4 py-2',
        large: 'text-md px-6 py-3 '
      }

      return sizeClasses[this.$props.size] || sizeClasses.medium
    }
  }
}
</script>
