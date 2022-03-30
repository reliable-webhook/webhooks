<template>
  <button
    class="text-gray-600 dark:text-dark-50 inline-flex items-center py-2 text-sm font-semibold focus:outline-none"
    @click="toggle"
  >
    <svg
      v-if="theme === 'light'"
      xmlns="http://www.w3.org/2000/svg"
      width="44"
      height="44"
      class="w-6 h-6"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
      fill="none"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <path
        stroke="none"
        d="M0 0h24v24H0z"
        fill="none"
      />
      <path d="M12 3c.132 0 .263 0 .393 0a7.5 7.5 0 0 0 7.92 12.446a9 9 0 1 1 -8.313 -12.454z" />
      <path d="M17 4a2 2 0 0 0 2 2a2 2 0 0 0 -2 2a2 2 0 0 0 -2 -2a2 2 0 0 0 2 -2" />
      <path d="M19 11h2m-1 -1v2" />
    </svg>
    <svg
      v-else
      xmlns="http://www.w3.org/2000/svg"
      width="44"
      height="44"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
      fill="none"
      class="w-6 h-6"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <path
        stroke="none"
        d="M0 0h24v24H0z"
        fill="none"
      />
      <circle
        cx="12"
        cy="12"
        r="3"
      />
      <line
        x1="12"
        y1="5"
        x2="12"
        y2="5.01"
      />
      <line
        x1="17"
        y1="7"
        x2="17"
        y2="7.01"
      />
      <line
        x1="19"
        y1="12"
        x2="19"
        y2="12.01"
      />
      <line
        x1="17"
        y1="17"
        x2="17"
        y2="17.01"
      />
      <line
        x1="12"
        y1="19"
        x2="12"
        y2="19.01"
      />
      <line
        x1="7"
        y1="17"
        x2="7"
        y2="17.01"
      />
      <line
        x1="5"
        y1="12"
        x2="5"
        y2="12.01"
      />
      <line
        x1="7"
        y1="7"
        x2="7"
        y2="7.01"
      />
    </svg>
  </button>
</template>

<script>
export default {
  name: 'ThemeTooggle',
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
