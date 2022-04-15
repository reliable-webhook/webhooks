<template>
  <UIModal
    :visible="visible"
    :with-cancel="false"
    :with-confirm="false"
    class="text-gray-700"
  >
    <div class="text-4xl text-center mb-2">
      🇺🇦
    </div>
    <p class="text-gray-900 dark:text-dark-50">
      ReliableWebhook is a <b>charityware</b>. If you find it useful, you can make a donation to help Ukraine through the
      <a
        href="https://www.comebackalive.in.ua/donate"
        class="focus:outline-none underline"
        target="_blank"
      >Come Back Alive</a> charity fund.
    </p>

    <form
      @submit.prevent="onSubmit"
      @keyup.enter="onSubmit"
    >
      <div class="flex items-center my-4 justify-center">
        <span class="mr-2 text-gray-900 dark:text-dark-50">$</span>
        <UIInput
          :model-value="amount"
          class="w-12 mr-5"
        />
        <UIButton
          ref="donateBtn"
          color-type="black"
          @click.prevent="$root.$refs.donateLink.click()"
        >
          Donate
        </UIButton>
      </div>
    </form>
    <div class="text-center">
      <a
        href="#"
        class="text-sm underline text-gray-900 dark:text-dark-50"
        @click.prevent="onCancel"
      >Not now</a>
    </div>
  </UIModal>
</template>

<script>
const initialData = {
  visible: false,
  amount: '5'
}

export default {
  name: 'InviteModal',
  props: {
    note: {
      type: String,
      required: false,
      default: ''
    }
  },
  emits: ['success', 'cancel'],
  data () {
    return { ...initialData }
  },
  methods: {
    show () {
      this.visible = true
    },
    close () {
      Object.assign(this, initialData)
    },
    onCancel () {
      this.close()
      this.$emit('cancel')
    },
    onSubmit () {
      this.$root.$refs.donateLink.click()
    }
  }
}
</script>
