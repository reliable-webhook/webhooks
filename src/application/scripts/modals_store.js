import { reactive } from 'vue'

const modalProperties = reactive({
  SignUpModal: { visible: false, note: null },
  InviteModal: { visible: false, note: null },
  CharityModal: { visible: false, note: null },
  CorsWarningModal: { visible: false, note: null }
})

function showModal (modalName, note) {
  if (modalProperties[modalName]) {
    Object.assign(modalProperties[modalName], { visible: true, note: note })
  }
}

function hideModal (modalName, note) {
  if (modalProperties[modalName]) {
    Object.assign(modalProperties[modalName], { visible: false, note: note })
  }
}

export { modalProperties, showModal, hideModal }
