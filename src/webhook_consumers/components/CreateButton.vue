<template>
  <UIButton
    size="medium"
    class="w-full"
    icon="PlusIcon"
    color-type="gray"
    border-type="dashed"
    :loading="isSubmitting"
    @click="handleConsumerCreation"
  >
    Add Consumer
  </UIButton>
</template>
<script>
import api from 'api'
import { currentUser } from 'application/scripts/current_user'

export default {
  name: 'ConsumerCreateButton',
  components: {
  },
  props: {
    projectId: {
      type: String,
      required: true
    }
  },
  emits: ['successSubmit'],
  data () {
    return {
      isSubmitting: false
    }
  },
  methods: {
    handleConsumerCreation () {
      if (currentUser.anonymous) {
        this.$modals.showModal('SignUpModal', 'Sign up to add Webhook URL')
      } else {
        this.createConsumer()
      }
    },
    createConsumer () {
      this.isSubmitting = true

      return api.post('webhook_consumers', {
        data: {
          subdomain: 'api',
          project_id: this.projectId
        }
      }).then((result) => {
        this.$emit('successSubmit', result.data.data)
        this.$alerts.success('Created')
      }).catch((error) => {
        console.error(error)

        this.$alerts.error('Something went wrong')
      }).finally(() => {
        this.isSubmitting = false
      })
    }
  }
}
</script>
