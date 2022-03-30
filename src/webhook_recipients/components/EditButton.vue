<template>
  <button
    class="hover:text-gray-900 dark:hover:text-white cursor-pointer"
  >
    <PencilIcon class="w-5 h-5" />
  </button>
</template>
<script>
import { PencilIcon } from 'icons'

export default {
  name: 'RecipientEditButton',
  components: {
    PencilIcon
  }
}
</script>
