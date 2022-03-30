<template>
  <UIButton
    size="small"
    icon="TwitterIcon"
    :href="shareUrl"
    :target="'_blank'"
  >
    Share
  </UIButton>
</template>

<script>
export default {
  name: 'ShareButton',
  computed: {
    shareUrl () {
      return 'https://twitter.com/intent/tweet?text=I%20want%20to%20learn%20more%20about%20Dignited'
    }
  }
}
</script>
