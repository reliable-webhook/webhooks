<template>
  <div class="inline-flex items-center">
    <Switch
      v-model="enabled"
      :class="enabled ? 'bg-gray-400 dark:bg-dark-800' : 'bg-white border-gray-200 dark:bg-dark-500'"
      class="relative inline-flex items-center h-6 w-12 border dark:border-0 rounded-full"
      @click="toggle"
    >
      <span class="sr-only">Enable notifications</span>
      <span
        :class="enabled ? 'translate-x-6 bg-white' : 'translate-x-1 bg-gray-400'"
        class="inline-flex items-center w-4 h-4 duration-200 ease-in-out transform rounded-full"
      />
    </Switch>
  </div>
</template>

<script>
import { Switch } from '@headlessui/vue'

export default {
  components: {
    Switch
  },
  props: {
    modelValue: {
      type: String,
      required: false,
      default: ''
    },
    confirmChange: {
      default: false,
      type: Boolean
    }
  },
  emits: ['update:modelValue', 'change'],
  data () {
    return {
      enabled: this.modelValue === 'enabled'
    }
  },
  methods: {
    toggle () {
      const statusName = this.enabled ? 'enabled' : 'disabled'

      this.$emit('update:modelValue', statusName)
      this.$emit('change', statusName)
    }
  }
}
</script>
