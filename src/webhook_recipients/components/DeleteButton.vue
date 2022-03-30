<template>
  <UIConfirmModal
    class="hover:text-gray-900 dark:hover:text-white cursor-pointer"
    @confirm="handleSuccessfulRecipientDelete"
  >
    <TrashIcon class="w-5 h-5" />
  </UIConfirmModal>
</template>
<script>
import api from 'api'
import UIConfirmModal from 'ui/components/ConfirmModal'
import { TrashIcon } from 'icons'

export default {
  name: 'RecipientDeleteButton',
  components: {
    UIConfirmModal,
    TrashIcon
  },
  props: {
    recipient: {
      type: Object,
      required: true
    }
  },
  emits: ['submit'],
  methods: {
    handleSuccessfulRecipientDelete () {
      return api.delete(`webhook_recipients/${this.recipient.id}`).then((result) => {
        this.$emit('submit', this.recipient)
        this.$alerts.success('Deleted')
      }).catch((error) => {
        console.error(error)
      })
    }
  }
}
</script>
