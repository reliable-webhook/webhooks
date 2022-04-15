<template>
  <div class="mb-4 md:mb-0">
    <div class="mb-2 font-semibold text-gray-500 dark:text-dark-50">
      Destination URLs
    </div>
    <div
      v-if="recipients.length"
      class="mb-1 space-y-1"
    >
      <div
        v-for="recipient in sortedRecipients"
        :key="recipient.id"
      >
        <RecipientControl
          :recipient="recipient"
          :project-id="projectId"
          @update="handleRecipientUpdate"
          @remove="$emit('update')"
          @create="$emit('update')"
        />
      </div>
    </div>
    <RecipientNewButton
      v-if="withCreate"
      :project-id="projectId"
      text="Add one more"
      @create="handleRecipientCreate"
    />
  </div>
</template>

<script>
import RecipientNewButton from './NewButton'
import RecipientControl from './Control'
import { addProjectRecipient, updateProjectRecipient } from 'application/scripts/global_store'

export default {
  name: 'ProjectRecipientsList',
  components: {
    RecipientControl,
    RecipientNewButton

  },
  props: {
    recipients: {
      default: () => [],
      type: Array,
      required: false
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
  computed: {
    sortedRecipients () {
      return [...this.recipients].sort((a, b) => new Date(a.created_at) - new Date(b.created_at))
    }
  },
  methods: {
    handleRecipientCreate (newRecipient) {
      addProjectRecipient(newRecipient)

      this.$emit('update')
    },
    handleRecipientUpdate (updatedRecipient) {
      updateProjectRecipient(updatedRecipient)
    }
  }
}
</script>
