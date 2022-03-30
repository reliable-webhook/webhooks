<template>
  <div>
    <div class="text-center text-gray-700">
      <div>
        Open GitHub Auth and enter the code:
      </div>
      <div class="m-6">
        <code
          class="text-2xl cursor-pointer rounded p-3 border"
          @click="copy"
        >{{ authData.user_code }}</code>
      </div>
    </div>
    <UIButton
      class="w-full"
      @click.prevent="$root.$refs.githubAuthLink.click()"
    >
      Open GitHub Auth
    </UIButton>
    <div class="text-sm text-gray-700">
      * You might need to wait up to 5 seconds after the code was submitted on GitHub.
    </div>
  </div>
</template>

<script>
import api from 'api'

export default {
  name: 'GithubAuth',
  emits: ['success'],
  data () {
    return {
      authData: {},
      interval: null
    }
  },
  mounted () {
    this.loadData()
  },
  beforeUnmount () {
    if (this.interval) {
      clearInterval(this.interval)
    }
  },
  methods: {
    loadData () {
      return api.get('github_auth').then((result) => {
        this.authData = result.data.data

        this.setAuthInterval()
      })
    },
    setAuthInterval () {
      this.interval = setInterval(() => this.checkAuth(), 6 * 1000)
    },
    copy () {
      if (navigator.clipboard) {
        navigator.clipboard.writeText(this.authData.user_code)

        this.$alerts.success('Copied')
      }
    },
    checkAuth () {
      return api.get(`github_auth/${this.authData.device_code}`).then((result) => {
        if (result.data.data.email) {
          this.$emit('success', result.data.data)
        }
      })
    }
  }
}
</script>
