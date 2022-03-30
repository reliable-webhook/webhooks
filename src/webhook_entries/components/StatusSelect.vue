<template>
  <Popover
    v-slot="{ open, close }"

    class="relative"
  >
    <PopoverButton
      ref="popoverButtonRef"
      class="inline-flex items-center space-x-1 px-2 whitespace-nowrap text-sm font-light text-gray-700 bg-gray-200 rounded-sm group hover:text-opacity-100 focus:outline-none dark:bg-dark-700 dark:text-dark-50"
    >
      <span>{{ seletectOptionName }}</span>
      <ChevronDownIcon
        v-if="!open"
        class="w-5 h-5 transition duration-150 ease-in-out group-hover:text-opacity-80"
      />
      <ChevronUpIcon
        v-else
        class="w-5 h-5 transition duration-150 ease-in-out group-hover:text-opacity-80"
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
      <PopoverPanel class="absolute z-10 w-auto bg-white right-0 px-4 mt-2 transform sm:px-0">
        <div class="overflow-hidden border border-gray-100 rounded-sm hover:border-gray-200 transition duration-150 ease-in-out">
          <div class="p-3 border-b border-gray-100 space-y-3">
            <label
              v-for="statusOption in statusOptions"
              :key="statusOption.value"
              class="flex items-center space-x-2 text-gray-600 cursor-pointer"
            >
              <input
                v-model="checkedStatuses"
                type="checkbox"
                :value="statusOption.value"
                class="form-tick appearance-none bg-white bg-check h-4 w-4 border border-gray-300 rounded-sm checked:bg-gray-600 checked:border-transparent focus:outline-none"
              >
              <span class="font-normal">
                {{ statusOption.name }}
              </span>
            </label>

            <div class="flex items-center space-x-3">
              <UIButton
                color-type="black"
                size="small"
                @click="handleApply"
              >
                Apply
              </UIButton>
              <UIButton
                color-type="gray"
                size="small"
                class="dark:bg-white dark:text-gray-900"
                @click="[handleReset(), close()]"
              >
                Clear
              </UIButton>
            </div>
          </div>
        </div>
      </PopoverPanel>
    </transition>
  </Popover>
</template>

<script>
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/vue'
import { ChevronDownIcon, ChevronUpIcon } from 'icons'

export default {
  name: 'StatusesFilterSelect',
  components: {
    Popover,
    PopoverButton,
    PopoverPanel,
    ChevronDownIcon,
    ChevronUpIcon
  },
  props: {
    modelValue: {
      type: Array,
      required: false,
      default: () => []
    }
  },
  emits: ['update:modelValue'],
  data () {
    return {
      checkedStatuses: this.modelValue || []
    }
  },
  computed: {
    statusOptions () {
      return [
        { name: 'Accepted', value: 'accepted' },
        { name: 'Sent', value: 'sent' },
        { name: 'Delivered', value: 'delivered' },
        { name: 'Failed', value: 'failed' }
      ]
    },
    statusNamesMap () {
      return this.statusOptions.reduce((acc, e) => {
        acc[e.value] = e.name

        return acc
      }, {})
    },
    statusOptionValues () {
      return this.statusOptions.map(s => s.value)
    },
    seletectOptionName () {
      if (this.statusOptionValues.every(v => this.checkedStatuses.includes(v)) || this.modelValue.length === 0) {
        return 'All statuses'
      } else {
        return this.modelValue.map((e) => this.statusNamesMap[e]).join(', ')
      }
    }
  },
  watch: {
    modelValue () {
      this.checkedStatuses = this.modelValue || []
    }
  },
  methods: {
    handleApply () {
      this.handleUpdate()
      this.togglePopover()
    },
    handleReset () {
      this.checkedStatuses = []
      this.handleUpdate()
    },
    handleUpdate () {
      this.$emit('update:modelValue', this.checkedStatuses)
    },
    togglePopover () {
      this.$refs.popoverButtonRef.$el.click()
    }
  }
}
</script>
