<template>
  <div
    ref="filtersContainerRef"
    class="flex items-center sm:pl-6 pr-2 space-x-1"
  >
    <button
      class="p-2 text-sm text-gray-700 dark:text-dark-50 hover:bg-gray-200 dark:hover:bg-dark-700 "
      @click="$emit('live-update-toggle')"
    >
      <PlayerPauseIcon
        v-if="isLiveUpdate"
        class="w-5 h-5"
      />
      <PlayerPlayIcon
        v-else
        class="w-5 h-5"
      />
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
import { PlayerPlayIcon, PlayerPauseIcon } from 'icons'

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
    TimeFilterSelect,
    PlayerPlayIcon,
    PlayerPauseIcon
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
