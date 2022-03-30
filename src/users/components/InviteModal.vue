<template>
  <UIModal
    :visible="visible"
    :confirm-loading="isSubmitting"
    title="Invite user to collaborate"
    @confirm="onSubmit"
    @cancel="onCancel"
  >
    <div
      v-if="note"
      class="px-3 py-2 mb-4 text-medium font-light text-gray-600 leading-6 border border-gray-200"
    >
      {{ note }}
    </div>
    <form
      @submit.prevent="onSubmit"
      @keyup.enter="onSubmit"
    >
      <UIInput
        v-model="email"
        label="Email"
        type="email"
        class="mb-6"
        placeholder="Type here the email of the person you want to invite"
        :error="errors?.email?.join('; ')"
      />
    </form>
  </UIModal>
</template>

<script>
import api from 'api'
import { currentUser } from 'application/scripts/current_user'

const initialData = {
  visible: false,
  isSubmitting: false,
  email: null,
  password: null,
  errors: {}
}

export default {
  name: 'InviteModal',
  components: {
  },
  props: {
    note: {
      type: String,
      required: false,
      default: ''
    }
  },
  emits: ['success', 'cancel'],
  data () {
    return { ...initialData }
  },
  methods: {
    show () {
      this.visible = true
    },
    close () {
      Object.assign(this, initialData)
    },
    onCancel () {
      this.close()
      this.$emit('cancel')
    },
    onSubmit () {
      this.isSubmitting = true

      return api.post(`users/${currentUser.id}/invites`, {
        data: { email: this.email }
      }).then((result) => {
        this.$emit('success', result.data.data)
        this.close()
        this.$alerts.success('Invited')
      }).catch((error) => {
        this.errors = error.response.data.errors
        console.error(error)
      }).finally(() => {
        this.isSubmitting = false
      })
    }
  }
}
</script>
