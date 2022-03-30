import './index.scss'

import { createApp } from 'vue'

import App from './app'
import router from './router'

import UIButton from 'ui/components/Button'
import UIInput from 'ui/components/Input'
import UIModal from 'ui/components/Modal'

import { setCurrentUser } from 'application/scripts/current_user'
import { success, error, info } from 'application/scripts/messages_store'
import { showModal, hideModal } from 'application/scripts/modals_store'

const app = createApp(App)

app.use(router)
app.component('UIButton', UIButton)
app.component('UIInput', UIInput)
app.component('UIModal', UIModal)

app.config.globalProperties.$alerts = { success, error, info }
app.config.globalProperties.$modals = { showModal, hideModal }

document.addEventListener('DOMContentLoaded', () => {
  const jwt = document.body.getAttribute('token')

  if (jwt) {
    setCurrentUser({ jwt })
  }

  document.body.innerHTML = '<div id="app"></div>'

  app.mount('#app')
})
