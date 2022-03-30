<template>
  <button
    v-if="project.recipients.length < 2"
    class="text-sm px-2 py-1 border-2 border-solid bg-white text-gray-500 hover:bg-gray-100 border-gray-300 flex justify-center h-fit items-center font-medium whitespace-nowrap focus:outline-none dark:border-dark-600 dark:text-dark-50 dark:bg-dark-600 dark:hover:bg-dark-700 dark:hover:text-gray-100"
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
      class="text-sm px-2 py-1 border-2 border-solid bg-white text-gray-500 hover:bg-gray-100 border-gray-300 flex justify-center h-fit items-center font-medium whitespace-nowrap focus:outline-none dark:border-dark-600 dark:text-dark-50 dark:bg-dark-600 dark:hover:bg-dark-700 dark:hover:text-gray-100"
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
      <PopoverPanel class="absolute z-10 w-60 bg-white right-0 px-4 mt-2 transform sm:px-0">
        <div class="overflow-hidden border border-gray-100 rounded-sm hover:border-gray-200 transition duration-150 ease-in-out">
          <div class="border-b border-gray-100">
            <label
              v-for="recipient in project.recipients"
              :key="recipient.id"
              class="px-3 py-2 flex items-center text-gray-600 cursor-pointer hover:bg-gray-50"
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
