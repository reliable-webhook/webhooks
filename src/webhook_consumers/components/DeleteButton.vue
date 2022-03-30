<template>
  <UIConfirmModal
    class="hover:text-gray-900 dark:hover:text-white cursor-pointer"
    @confirm="handleSuccessfulConsumerDelete"
  >
    <TrashIcon class="w-5 h-5" />
  </UIConfirmModal>
</template>
<script>
import api from 'api'
import UIConfirmModal from 'ui/components/ConfirmModal'
import { TrashIcon } from 'icons'

export default {
  name: 'ConsumerDeleteButton',
  components: {
    UIConfirmModal,
    TrashIcon
  },
  props: {
    consumer: {
      type: Object,
      required: true
    }
  },
  emits: ['successSubmit'],
  methods: {
    handleSuccessfulConsumerDelete () {
      return api.delete(`webhook_consumers/${this.consumer.id}`).then((result) => {
        this.$emit('successSubmit', this.consumer)
        this.$alerts.success('Deleted')
      }).catch((error) => {
        console.error(error)
        this.$alerts.error('Something went wrong')
      })
    }
  }
}
</script>
