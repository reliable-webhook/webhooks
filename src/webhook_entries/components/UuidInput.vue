<template>
  <div class="flex items-center py-2 px-3 space-x-1">
    <SearchIcon
      v-if="focused"
      class="w-4 h-4 text-gray-700 dark:text-dark-50"
    />

    <input
      ref="inputRef"
      :value="modelValue"
      placeholder="Filter by uuid"
      class="flex-1 appearance-none w-full bg-white dark:bg-dark-800 text-gray-900 dark:text-dark-50 placeholder-gray-400 dark:placeholder-dark-200 text-sm focus:outline-none "
      @focus="focused = true"
      @blur="focused = false"
      @change="handleInput"
    >
  </div>
</template>

<script>
import { SearchIcon } from 'icons'

export default {
  name: 'UuidFilterInput',
  components: {
    SearchIcon
  },
  props: {
    modelValue: {
      type: String,
      required: false,
      default: ''
    }
  },
  emits: ['update:modelValue'],
  data: function () {
    return {
      focused: false
    }
  },
  methods: {
    handleInput (e) {
      this.$emit('update:modelValue', e.target.value)
    }
  }
}
</script>
