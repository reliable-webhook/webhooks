<template>
  <UIModal
    :visible="visible"
    :confirm-loading="isSubmitting"
    :title="dataNote || 'Sign Up'"
    @confirm="onSubmit"
    @cancel="onCancel"
  >
    <form
      @submit.prevent="onSubmit"
      @keyup.enter="onSubmit"
    >
      <UIInput
        v-model="email"
        label="Email"
        type="email"
        class="mb-6"
        placeholder="user@example.com"
        :error="errors?.email?.join('; ')"
      />
      <UIInput
        v-model="password"
        label="Password"
        class="mb-6"
        type="password"
        placeholder="********"
        :error="errors?.password?.join('; ')"
      />
    </form>
  </UIModal>
</template>

<script>
import api from 'api'
import { setSession } from 'application/scripts/current_user'

const initialData = {
  visible: false,
  isSubmitting: false,
  dataNote: '',
  email: null,
  password: null,
  errors: {}
}

export default {
  name: 'SignUpModal',
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
  watch: {
    note () {
      if (this.note) {
        this.dataNote = this.note
      }
    }
  },
  mounted () {
    this.dataNote = this.note
  },
  methods: {
    show () {
      this.visible = true
    },
    close () {
      Object.assign(this, { ...initialData, dataNote: this.dataNote })
    },
    onCancel () {
      this.close()
      this.$emit('cancel')
    },
    onSubmit () {
      this.isSubmitting = true

      return api.post('session/sign_up', {
        data: {
          email: this.email,
          password: this.password
        }
      }).then((result) => {
        this.$emit('success', result.data.data)
        setSession(result.data.data)
        this.close()
        this.$alerts.success('Signed-in')

        this.$router.push({ name: 'home' })
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
