<template>
  <div
    ref="filtersContainerRef"
    class="flex items-center sm:pl-6 pr-2 space-x-1"
  >
    <button
      class="p-2 text-sm hover:bg-gray-200 dark:hover:bg-dark-700 dark:text-dark-50"
      @click="$emit('live-update-toggle')"
    >
      <svg
        v-if="isLiveUpdate"
        xmlns="http://www.w3.org/2000/svg"
        class="w-5 h-5"
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
          x="6"
          y="5"
          width="4"
          height="14"
          rx="1"
        />
        <rect
          x="14"
          y="5"
          width="4"
          height="14"
          rx="1"
        />
      </svg>
      <svg
        v-else
        xmlns="http://www.w3.org/2000/svg"
        class="w-5 h-5"
        width="44"
        height="44"
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
        <path d="M7 4v16l13 -8z" />
      </svg>
    </button>
    <UuidFilterInput
      v-model="searchText"
      class="w-full"
      @update:model-value="$emit('change', $data)"
    />
    <StatusesFilterSelect
      v-model="statuses"
      @update:model-value="$emit('change', $data)"
    />
    <TimeFilterSelect
      v-model="timeRange"
      @update:model-value="$emit('change', $data)"
    />
  </div>
</template>
<script>
import UuidFilterInput from './UuidInput'
import StatusesFilterSelect from './StatusSelect'
import TimeFilterSelect from './TimeSelect'

const initialData = {
  searchText: '',
  statuses: [],
  timeRange: []
}

export default ({
  name: 'WebhookEntriesFilters',
  components: {
    UuidFilterInput,
    StatusesFilterSelect,
    TimeFilterSelect
  },
  props: {
    isLiveUpdate: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  emits: ['change', 'live-update-toggle'],
  data () {
    return { ...initialData }
  },
  methods: {
    handleReset () {
      Object.assign(this, initialData)

      this.$emit('change', this.$data)
    }
  }
})
</script>
