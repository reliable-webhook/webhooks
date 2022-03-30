<template>
  <a
    href="https://github.com/reliable-webhook/webhooks"
    class="text-gray-600 dark:text-dark-50 inline-flex items-center py-2 text-sm font-semibold focus:outline-none"
    target="_blank"
    @click="toggle"
  >
    <GithubIcon />
  </a>
</template>

<script>
import { GithubIcon } from 'icons'

export default {
  name: 'GithubLink',
  components: {
    GithubIcon
  }
}
</script>
