<template>
  <div>
    <div class="bg-white dark:bg-dark-800 h-screen overflow-hidden">
      <Navbar />
      <RouterView v-if="isLoaded" />
      <ModalsContainer />
      <a
        ref="githubAuthLink"
        class="hidden"
        target="_blank"
        href="https://github.com/login/device"
      />
      <a
        ref="donateLink"
        class="hidden"
        target="_blank"
        href="https://pay.fondy.eu/api/checkout?button=dc75627e73000f3b6fb87c83db2fc64767fe1b63"
      />
    </div>
  </div>
</template>

<script>
import Navbar from 'navigation/components/Navbar'
import ModalsContainer from 'application/components/ModalsContainer'
import { fetchSession, currentUser } from 'application/scripts/current_user'

export default {
  name: 'App',
  components: {
    Navbar,
    ModalsContainer
  },
  data () {
    return {
      isLoaded: false
    }
  },
  mounted () {
    if (this.$route.query.token) {
      currentUser.jwt = this.$route.query.token
    }

    if (localStorage.getItem('theme') !== 'light') {
      document.body.classList.toggle('dark')
    }

    document.body.classList.toggle('p-0')

    fetchSession().then(() => {
      this.isLoaded = true
    })
  }
}
</script>
