<template>
  <SignUpModal
    :visible="modalProperties.SignUpModal.visible"
    :note="modalProperties.SignUpModal.note"
    @success="handleSuccessSingUp"
    @cancel="handleCanselSingUp"
  />
  <InviteModal
    :visible="modalProperties.InviteModal.visible"
    @success="handleSuccessInvite"
    @cancel="handleCanselInvite"
  />
</template>

<script>
import { modalProperties, hideModal } from 'application/scripts/modals_store'
import SignUpModal from 'users/components/SignUpModal'
import InviteModal from 'users/components/InviteModal'

export default {
  name: 'ModalsContainer',
  components: {
    SignUpModal,
    InviteModal
  },
  computed: {
    modalProperties: () => modalProperties
  },
  methods: {
    handleSuccessSingUp () {
      hideModal('SignUpModal')
    },
    handleCanselSingUp () {
      hideModal('SignUpModal')
    },
    handleSuccessInvite () {
      hideModal('InviteModal')
    },
    handleCanselInvite () {
      hideModal('InviteModal')
    }
  }
}
</script>
