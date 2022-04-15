<template>
  <button
    class="text-gray-600 dark:text-dark-50 inline-flex items-center py-2 text-sm font-semibold focus:outline-none"
    @click="toggle"
  >
    <SunIcon
      v-if="theme === 'light'"
      class="w-6 h-6"
    />
    <MoonIcon
      v-else
      class="w-6 h-6"
    />
  </button>
</template>

<script>
import { SunIcon, MoonIcon } from 'icons'

export default {
  name: 'ThemeTooggle',
  components: {
    SunIcon,
    MoonIcon
  },
  data () {
    return {
      theme: document.body.classList.contains('dark') ? 'dark' : 'light'
    }
  },
  methods: {
    toggle () {
      this.theme = this.theme === 'dark' ? 'light' : 'dark'

      document.body.classList.toggle('dark')

      localStorage.setItem('theme', this.theme)
    }
  }
}
</script>
