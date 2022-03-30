<template>
  <div
    class="group w-full p-2 rounded-sm  bg-gray-100 dark:bg-dark-700 text-gray-700 dark:text-dark-50 hover:cursor-pointer"
    :class="{ 'hover:bg-gray-200': !visibleRecipientUrlInput }"
  >
    <div class="relative flex items-center justify-between">
      <div class="mr-2">
        <MethodSelect
          v-model="methodName"
          :confirm-change="!!recipient.id"
          @change="maybeUpdateRecipient"
        />
      </div>
      <div class="flex items-center justify-start w-full flex-grow mb-2 md:mb-0">
        <input
          v-if="visibleRecipientUrlInput"
          ref="recipientUrlInputRef"
          v-model="recipientUrl"
          type="text"
          placeholder="http://localhost:3000/webhook"
          class="bg-gray-100 appearance-none w-full text-sm font-light text-gray-700  dark:placeholder-dark-500 focus:outline-none dark:bg-dark-700 dark:text-dark-50"
          @keyup.enter="saveRecipient"
        >
        <span
          v-else
          class="text-sm font-light break-all"
          @click="copy"
        >
          {{ recipient.url }}
        </span>
      </div>
      <RecipientSaveButton
        v-if="visibleRecipientUrlInput"
        class="px-1"
        @click="saveRecipient"
      />
      <div
        v-else
        class="ml-1 flex items-center justify-start space-x-1"
      >
        <RecipientEditButton
          class="hidden group-hover:block"
          :recipient="recipient"
          @click="showRecipientEditInput"
        />
        <RecipientDeleteButton
          class="hidden group-hover:block"
          :recipient="recipient"
          @submit="handleRecipientDelete"
        />
        <RecipientStatusSwitch
          v-model="statusName"
          @change="maybeUpdateRecipient"
        />
      </div>
    </div>
  </div>
</template>
<script>
import api from 'api'
import { updateProjectRecipient, removeProjectRecipient } from 'application/scripts/global_store'
import RecipientDeleteButton from './DeleteButton'
import RecipientEditButton from './EditButton'
import RecipientSaveButton from './SaveButton'
import RecipientStatusSwitch from './StatusSwitch'
import MethodSelect from './MethodSelect'

export default {
  name: 'RecipientControl',
  components: {
    RecipientEditButton,
    RecipientDeleteButton,
    RecipientSaveButton,
    RecipientStatusSwitch,
    MethodSelect
  },
  props: {
    recipient: {
      default: () => ({}),
      type: Object
    },
    projectId: {
      type: String,
      required: true
    }
  },
  emits: ['create', 'update', 'remove'],
  data () {
    return {
      visibleRecipientUrlInput: !this.recipient.id,
      recipientUrl: this.recipient.url,
      methodName: this.recipient.method || 'POST',
      statusName: this.recipient.status || 'disabled'
    }
  },
  mounted () {
    this.$refs.recipientUrlInputRef?.focus()
  },
  methods: {
    copy () {
      if (navigator.clipboard) {
        navigator.clipboard.writeText(this.recipient.url)

        this.$alerts.success('Copied')
      }
    },
    handleSuccessUpdate (updatedRecipient) {
      updateProjectRecipient(updatedRecipient)
    },
    handleRecipientDelete (deletedRecipient) {
      removeProjectRecipient(deletedRecipient)

      this.$emit('remove')
    },
    maybeUpdateRecipient () {
      if (this.recipient.id) this.updateRecipient()
    },
    showRecipientEditInput () {
      this.visibleRecipientUrlInput = true
      this.$nextTick(() => this.$refs.recipientUrlInputRef.focus())
    },
    hideRecipientEditInput () {
      this.visibleRecipientUrlInput = false
    },
    saveRecipient () {
      if (this.recipient.id) {
        this.updateRecipient()
      } else {
        this.createRecipient()
      }
    },
    createRecipient () {
      return api.post('webhook_recipients', {
        data: {
          project_id: this.projectId,
          url: this.recipientUrl,
          method: this.methodName
        }
      }).then((result) => {
        this.$emit('create', result.data.data)
        this.hideRecipientEditInput()
        this.$alerts.success('Created')
      }).catch((error) => {
        this.errors = error.response.data.errors
        console.error(error)
      })
    },
    updateRecipient () {
      return api.put(`webhook_recipients/${this.recipient.id}`, {
        data: {
          url: this.recipientUrl,
          method: this.methodName,
          status: this.statusName
        }
      }).then((result) => {
        this.$emit('update', result.data.data)
        this.hideRecipientEditInput()
        this.$alerts.success('Updated')
      }).catch((error) => {
        this.errors = error.response.data.errors
        console.error(error)
      })
    }
  }
}
</script>
