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
      <PopoverPanel class="absolute z-10 w-40 bg-white right-0 mt-2 transform">
        <div class="overflow-hidden border border-gray-100 rounded-sm hover:border-gray-200 transition duration-150 ease-in-out">
          <div class="border-b border-gray-100">
            <label
              v-for="option in rangeOptions"
              :key="option.value"
              class="px-3 py-2 flex items-center text-gray-600 cursor-pointer hover:bg-gray-50"
              @click="[handleUpdate(option.value), close()]"
            >
              <span class="font-normal">
                {{ option.name }}
              </span>
            </label>
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
  name: 'TimeFilterSelect',
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
      selectedRange: this.modelValue,
      selectedRangeName: 'all_time'
    }
  },
  computed: {
    rangeOptions () {
      return [
        {
          name: 'All time',
          value: 'all_time',
          range: () => []
        },
        {
          name: 'Last 5 minutes',
          value: 'last_5_min',
          range: () => [new Date(new Date() - 5 * 60 * 1000), new Date()]
        },
        {
          name: 'Last 20 minutes',
          value: 'last_20_min',
          range: () => [new Date(new Date() - 20 * 60 * 1000), new Date()]
        },
        {
          name: 'Last 1 Hour',
          value: 'last_1_hour',
          range: () => [new Date(new Date() - 60 * 60 * 1000), new Date()]
        },
        {
          name: 'Last 3 Hours',
          value: 'last_3_hours',
          range: () => [new Date(new Date() - 3 * 60 * 60 * 1000), new Date()]
        },
        {
          name: 'Last 12 Hours',
          value: 'last_12_hours',
          range: () => [new Date(new Date() - 12 * 60 * 60 * 1000), new Date()]
        },
        {
          name: 'Today',
          value: 'today',
          range: () => [new Date(new Date().setHours(0, 0, 0, 0)), new Date(new Date().setHours(0, 0, 0, 0) + 24 * 60 * 60 * 1000 - 1)]
        },
        {
          name: 'Yesterday',
          value: 'yesterday',
          range: () => [new Date(new Date().setHours(0, 0, 0, 0) - 24 * 60 * 60 * 1000), new Date(new Date().setHours(0, 0, 0, 0) - 1)]
        },
        {
          name: 'Last 7 days',
          value: 'last_7_days',
          range: () => [new Date(new Date() - 7 * 24 * 60 * 60 * 1000), new Date()]
        }
      ]
    },
    rangeNamesMap () {
      return this.rangeOptions.reduce((acc, e) => {
        acc[e.value] = e

        return acc
      }, {})
    },
    seletectOptionName () {
      if (this.modelValue.length === 0) {
        return 'All time'
      } else {
        return this.rangeNamesMap[this.selectedRangeName].name
      }
    }
  },
  methods: {
    handleUpdate (rangeName) {
      this.selectedRangeName = rangeName

      this.$emit('update:modelValue', this.rangeNamesMap[rangeName].range())
    }
  }
}
</script>
