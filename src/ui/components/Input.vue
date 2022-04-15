<template>
  <div class="grid">
    <div class="col-span-12">
      <label
        v-if="label?.length"
        for="name"
        class="mb-2 block text-md font-normal text-gray-700 dark:text-dark-50"
      >
        <span
          v-if="required"
          class="text-red-500 required-dot"
        >
          *
        </span>
        {{ label }}:
      </label>
      <input
        :value="modelValue"
        :type="type"
        :name="name"
        :placeholder="placeholder"
        :required="required ? 'required' : ''"
        :class="error ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'"
        class="flex-1 appearance-none w-full py-2 px-3 bg-white dark:bg-dark-700 text-gray-900 dark:text-dark-50 placeholder-gray-400 dark:placeholder-dark-200 text-sm focus:outline-none focus:border-gray-900 border"
        @input="handleInput"
      >
      <p
        v-if="error"
        class="mt-1 text-sm text-red-500 -bottom-6"
      >
        {{ error }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UIInput',
  props: {
    disabled: {
      type: Boolean,
      required: false,
      default: false
    },
    required: {
      type: Boolean,
      required: false,
      default: false
    },
    error: {
      type: String,
      required: false,
      default: ''
    },
    label: {
      type: String,
      required: false,
      default: ''
    },
    type: {
      type: String,
      required: false,
      default: ''
    },
    name: {
      type: String,
      required: false,
      default: ''
    },
    placeholder: {
      type: String,
      required: false,
      default: ''
    },
    modelValue: {
      type: String,
      required: false,
      default: ''
    }
  },
  emits: ['update:modelValue'],
  methods: {
    handleInput (e) {
      this.$emit('update:modelValue', e.target.value)
    }
  }
}
</script>
