<template>
  <button
    v-if="project.recipients.length < 2"
    class="text-sm px-2 py-1 border-2 border-solid bg-white dark:bg-dark-600 text-gray-500 dark:text-dark-50 hover:bg-gray-100 dark:hover:bg-dark-700 border-gray-300 dark:border-dark-600 dark:hover:text-gray-100 flex justify-center h-fit items-center font-medium whitespace-nowrap focus:outline-none"
    @click="handleMenuItemClick(project.recipients[0])"
  >
    <SendIcon class="w-5 h-5 mr-1" />
    <span>Send</span>
  </button>
  <Popover
    v-else
    v-slot="{ close }"

    class="relative"
  >
    <PopoverButton
      ref="popoverButtonRef"
      class="text-sm px-2 py-1 border-2 border-solid bg-white dark:bg-dark-600 text-gray-500 dark:text-dark-50 hover:bg-gray-100 dark:hover:bg-dark-700 border-gray-300 dark:border-dark-600 dark:hover:text-gray-100 flex justify-center h-fit items-center font-medium whitespace-nowrap focus:outline-none"
    >
      <SendIcon class="w-5 h-5 mr-1" />
      <span>Send</span>
    </PopoverButton>

    <transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="translate-y-1 opacity-0"
      enter-to-class="translate-y-0 opacity-100"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="translate-y-0 opacity-100"
      leave-to-class="translate-y-1 opacity-0"
    >
      <PopoverPanel class="absolute z-10 bg-white dark:bg-dark-800 right-0 mt-2 transform">
        <div class="overflow-hidden border border-gray-100 dark:border-dark-600 rounded-sm hover:border-gray-200 dark:hover:border-dark-700 transition duration-150 ease-in-out">
          <div>
            <label
              v-for="recipient in project.recipients"
              :key="recipient.id"
              class="px-3 py-2 flex items-center text-gray-600 dark:text-dark-50 cursor-pointer hover:bg-gray-50 dark:hover:bg-dark-900"
              @click="[handleMenuItemClick(recipient), close()]"
            >
              <span>{{ recipient.url }}</span>
            </label>
          </div>
        </div>
      </PopoverPanel>
    </transition>
  </Popover>
</template>

<script>
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/vue'
import { SendIcon } from 'icons'

export default {
  name: 'DirectSendDropdown',
  components: {
    Popover,
    PopoverButton,
    PopoverPanel,
    SendIcon
  },
  props: {
    project: {
      type: Object,
      required: true
    }
  },
  emits: ['click'],
  methods: {
    handleMenuItemClick (recipient) {
      if (recipient) {
        this.$emit('click', recipient)
      } else {
        document.querySelector('[data-role="add-destination"]').click()
      }
    }
  }
}
</script>
