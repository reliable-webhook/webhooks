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
            class="flex items-center px-3 py-2 hover:bg-gray-100 hover:text-gray-700 dark:hover:text-dark-50 dark:hover:bg-dark-900 focus:outline-none"
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
  <UIModal
    :visible="isShowModal"
    :size="'large'"
    :with-cancel="false"
    :confirm-text="'OK'"
    @confirm="onModalOk"
  >
    Web version doesn't support PUT, PATCH, DELETE methods because of CORS. Please, use VS Code extension or Desktop application instead.

    <div class="flex space-x-3 mt-3">
      <a
        href="https://marketplace.visualstudio.com/items?itemName=ReliableWebhook.ReliableWebhook"
        data-turbolinks="false"
        style="height: 45px"
        class="
            flex
            w-full
            items-center
            justify-center
            px-5
            py-3
 focus:outline-none
            border border-transparent
            text-base
            font-medium
            rounded-md
            text-gray-700
            border-gray-400
            bg-gray-100
            hover:shadow-md
          "
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="mr-2 icon icon-tabler icon-tabler-puzzle"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          fill="none"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path
            stroke="none"
            d="M0 0h24v24H0z"
            fill="none"
          />
          <path d="M4 7h3a1 1 0 0 0 1 -1v-1a2 2 0 0 1 4 0v1a1 1 0 0 0 1 1h3a1 1 0 0 1 1 1v3a1 1 0 0 0 1 1h1a2 2 0 0 1 0 4h-1a1 1 0 0 0 -1 1v3a1 1 0 0 1 -1 1h-3a1 1 0 0 1 -1 -1v-1a2 2 0 0 0 -4 0v1a1 1 0 0 1 -1 1h-3a1 1 0 0 1 -1 -1v-3a1 1 0 0 1 1 -1h1a2 2 0 0 0 0 -4h-1a1 1 0 0 1 -1 -1v-3a1 1 0 0 1 1 -1" />
        </svg>
        VS Code
      </a>
      <a
        href="https://github.com/reliable-webhook/webhooks/releases/tag/latest"
        data-turbolinks="false"
        style="height: 45px"
        class="
            flex
            items-center
            justify-center
            px-5
            focus:outline-none
            w-full
            py-3
            border border-transparent
            text-base
            font-medium
            rounded-md
            text-gray-700
            border-gray-400
            bg-gray-100
            hover:shadow-md
          "
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="mr-2 icon icon-tabler icon-tabler-device-desktop"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          fill="none"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path
            stroke="none"
            d="M0 0h24v24H0z"
            fill="none"
          />
          <rect
            x="3"
            y="4"
            width="18"
            height="12"
            rx="1"
          />
          <line
            x1="7"
            y1="20"
            x2="17"
            y2="20"
          />
          <line
            x1="9"
            y1="16"
            x2="9"
            y2="20"
          />
          <line
            x1="15"
            y1="16"
            x2="15"
            y2="20"
          />
        </svg>
        Desktop
      </a>
    </div>
  </UIModal>
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
      selectedOptionValue: this.modelValue || this.methodOptions[0].value,
      isShowModal: false
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
    onModalOk () {
      this.isShowModal = false
    },
    handleSelect (optionValue) {
      if (!process.env.VSCODE && !process.env.ELECTRON && ['PUT', 'PATCH', 'DELETE'].includes(optionValue)) {
        this.isShowModal = true
      } else {
        this.selectedOptionValue = optionValue

        this.$emit('update:modelValue', this.selectedOptionValue)
        this.$emit('change', this.selectedOptionValue)
      }
    }
  }
}
</script>
