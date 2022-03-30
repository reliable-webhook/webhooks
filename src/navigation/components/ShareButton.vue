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
      return 'https://twitter.com/intent/tweet?text=Webhooks%20development%20relay%20with%20VS%20Code%20extension%3A%0Ahttps%3A%2F%2Fwww.reliablewebhook.com%20%40ReliableWebhook'
    }
  }
}
</script>
