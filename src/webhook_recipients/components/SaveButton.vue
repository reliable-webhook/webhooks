<template>
  <button
    class="hover:text-gray-900 dark:hover:text-white cursor-pointer"
  >
    <CheckIcon class="w-5 h-5" />
  </button>
</template>
<script>
import { CheckIcon } from 'icons'

export default {
  name: 'RecipientSaveButton',
  components: {
    CheckIcon
  }
}
</script>
