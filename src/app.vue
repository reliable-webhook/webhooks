<template>
  <div>
    <div class="dark:bg-dark-800 bg-white h-screen overflow-hidden">
      <Navbar />
      <RouterView
        v-if="isLoaded"
      />
      <ModalsContainer />
    </div>
  </div>
</template>

<script>
import Navbar from 'navigation/components/Navbar'
import ModalsContainer from 'application/components/ModalsContainer'
import { currentUser, fetchSession, signOutCurrentUser } from 'application/scripts/current_user'

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
  computed: {
    currentUser: () => currentUser
  },
  mounted () {
    if (localStorage.getItem('theme') !== 'light') {
      document.body.classList.toggle('dark')
    }

    document.body.classList.toggle('p-0')

    fetchSession().then(() => {
      this.isLoaded = true
    })
  },
  methods: {
    signOutCurrentUser
  }
}
</script>
