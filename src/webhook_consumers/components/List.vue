<template>
  <div class="mb-4 md:mb-0">
    <div class="font-semibold text-gray-500 mb-2 dark:text-dark-50">
      Webhook URLs
    </div>
    <div
      v-if="consumers.length"
      class="mb-1 space-y-1"
    >
      <div
        v-for="consumer in sortedConsumers"
        :key="consumer.id"
      >
        <ConsumerControl
          :consumer="consumer"
          @remove="$emit('update')"
        />
      </div>
    </div>
    <ConsumerCreateButton
      v-if="withCreate"
      :project-id="projectId"
      @successSubmit="handleSuccessCreate"
    />
  </div>
</template>

<script>
import ConsumerControl from './Control'
import ConsumerCreateButton from './CreateButton'

import { addProjectConsumer } from 'application/scripts/global_store'

export default {
  name: 'ProjectConsumersList',
  components: {
    ConsumerControl,
    ConsumerCreateButton
  },
  props: {
    consumers: {
      default: () => [],
      type: Array,
      required: true
    },
    withCreate: {
      type: Boolean,
      required: false,
      default: true
    },
    projectId: {
      type: String,
      required: true
    }
  },
  emits: ['update'],
  data () {
    return {
      isCreatingNewConsumer: false
    }
  },
  computed: {
    sortedConsumers () {
      return [...this.consumers].sort((a, b) => new Date(a.created_at) - new Date(b.created_at))
    }
  },
  methods: {
    handleSuccessCreate (newConsumer) {
      addProjectConsumer(newConsumer)

      this.$emit('update')
    }
  }
}
</script>
