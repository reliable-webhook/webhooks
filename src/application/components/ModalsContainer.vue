<template>
  <SignUpModal
    :visible="modalProperties.SignUpModal.visible"
    :note="modalProperties.SignUpModal.note"
    @success="handleSuccessSingUp"
    @cancel="handleCancelSingUp"
  />
  <InviteModal
    :visible="modalProperties.InviteModal.visible"
    @success="handleSuccessInvite"
    @cancel="handleCancelInvite"
  />
  <CharityModal
    :visible="modalProperties.CharityModal.visible"
    @cancel="handleCancelCharity"
  />
</template>

<script>
import { modalProperties, hideModal } from 'application/scripts/modals_store'
import SignUpModal from 'users/components/SignUpModal'
import InviteModal from 'users/components/InviteModal'
import CharityModal from 'application/components/CharityModal'

export default {
  name: 'ModalsContainer',
  components: {
    SignUpModal,
    InviteModal,
    CharityModal
  },
  computed: {
    modalProperties: () => modalProperties
  },
  methods: {
    handleSuccessSingUp () {
      hideModal('SignUpModal')
    },
    handleCancelSingUp () {
      hideModal('SignUpModal')
    },
    handleSuccessInvite () {
      hideModal('InviteModal')
    },
    handleCancelInvite () {
      hideModal('InviteModal')
    },
    handleCancelCharity () {
      hideModal('CharityModal')
    }
  }
}
</script>
