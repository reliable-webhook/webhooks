<template>
  <UIModal
    :visible="visible"
    :title="dataNote || 'Sign Up'"
    :with-confirm="false"
    :with-cancel="false"
    @cancel="onCancel"
  >
    <template v-if="!authType">
      <UIButton
        class="block w-full"
        icon="EmailIcon"
        @click="authType = 'email'"
      >
        Email/Password
      </UIButton>
      <UIButton
        class="block w-full mt-3"
        icon="GithubIcon"
        @click="authType = 'github'"
      >
        GitHub
      </UIButton>
    </template>
    <form
      v-if="authType === 'email'"
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
      <div class="flex justify-end space-x-4">
        <UIButton
          size="small"
          class="w-1/2 md:w-1/3 lg:w-1/4"
          color-type="white"
          type="button"
          @click="onCancel"
        >
          Close
        </UIButton>
        <UIButton
          size="small"
          class="w-1/2 md:w-1/3 lg:w-1/4"
          color-type="black"
          type="submit"
          :loading="isSubmitting"
          @click="onSubmit"
        >
          Submit
        </UIButton>
      </div>
    </form>
    <GithubAuth
      v-if="authType === 'github'"
      @success="onSuccess"
    />
  </UIModal>
</template>

<script>
import api from 'api'
import { setSession } from 'application/scripts/current_user'
import GithubAuth from './GithubAuth'

const initialData = {
  visible: false,
  isSubmitting: false,
  authType: '',
  dataNote: '',
  email: null,
  password: null,
  errors: {}
}

export default {
  name: 'SignUpModal',
  components: {
    GithubAuth
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
    onSuccess (data) {
      this.$emit('success', data)
      setSession(data)
      this.close()
      this.$alerts.success('Signed-in')

      this.$router.push({ name: 'home' })

      this.$modals.showModal('CharityModal')
    },
    onSubmit () {
      this.isSubmitting = true

      return api.post('session/sign_up', {
        data: {
          email: this.email,
          password: this.password
        }
      }).then((result) => {
        this.onSuccess(result.data.data)
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
