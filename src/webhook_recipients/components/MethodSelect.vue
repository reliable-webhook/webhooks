<template>
  <Popover
    v-slot="{ open, close }"
    v-model="selectedOptionValue"
    class="relative"
  >
    <PopoverButton
      :class="open ? '' : 'text-opacity-90'"
      class="inline-flex items-center px-1 text-sm font-light text-white dark:text-dark-50 bg-gray-400 dark:bg-dark-800 rounded-sm group focus:outline-none"
    >
      <span>{{ selectedOptionValue }}</span>
      <ChevronDownIcon
        :class="open ? '' : 'text-opacity-70'"
        class="w-5 h-5 ml-1 transition duration-150 ease-in-out"
        aria-hidden="true"
      />
    </PopoverButton>
    <transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="translate-y-1 opacity-0"
      enter-to-class="translate-y-0 opacity-100"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="translate-y-0 opacity-100"
      leave-to-class="translate-y-1 opacity-0"
    >
      <PopoverPanel class="absolute z-10 w-24 mt-1">
        <div class="overflow-hidden border border-gray-100 dark:border-dark-600">
          <div
            v-for="methodOption in methodOptions"
            :key="methodOption.name"
            :value="methodOption.value"
            :class="selectedOptionValue === methodOption.value ? 'bg-gray-200 dark:bg-dark-900' : 'bg-white dark:bg-dark-800'"
            class="flex items-center px-3 py-2 hover:bg-gray-100 dark:hover:bg-dark-900 hover:text-gray-700 dark:hover:text-dark-50 focus:outline-none"
            @click="[handleSelect(methodOption.value), close()]"
          >
            <p class="text-sm font-light">
              {{ methodOption.name }}
            </p>
          </div>
        </div>
      </PopoverPanel>
    </transition>
  </Popover>
</template>

<script>
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/vue'
import { ChevronDownIcon } from 'icons'

export default {
  components: {
    Popover,
    PopoverButton,
    PopoverPanel,
    ChevronDownIcon
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
      selectedOptionValue: this.modelValue || this.methodOptions[0].value
    }
  },
  computed: {
    methodOptions () {
      return [
        { name: 'POST', value: 'POST' },
        { name: 'GET', value: 'GET' },
        { name: 'PUT', value: 'PUT' },
        { name: 'PATCH', value: 'PATCH' },
        { name: 'DELETE', value: 'DELETE' }
      ]
    }
  },
  methods: {
    handleSelect (optionValue) {
      if (!process.env.VSCODE && !process.env.ELECTRON && ['PUT', 'PATCH', 'DELETE'].includes(optionValue)) {
        this.$modals.showModal('CorsWarningModal')
      } else {
        this.selectedOptionValue = optionValue

        this.$emit('update:modelValue', this.selectedOptionValue)
        this.$emit('change', this.selectedOptionValue)
      }
    }
  }
}
</script>
