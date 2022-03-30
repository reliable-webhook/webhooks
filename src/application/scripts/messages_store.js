import { reactive } from 'vue'

const alertMessages = reactive([])

function addMessage (message, type = 'success') {
  const messageUniqId = Math.random().toString(16).slice(2)

  alertMessages.push({ id: messageUniqId, type: type, message: message })

  setTimeout(() => {
    const alertMessageIndex = alertMessages.findIndex(m => m.id === messageUniqId)

    if (alertMessageIndex !== -1) alertMessages.splice(alertMessageIndex, 1)
  }, 2000)
}

function success (message) {
  addMessage(message, 'success')
}

function error (message) {
  addMessage(message, 'error')
}

function info (message) {
  addMessage(message, 'info')
}

export { alertMessages, success, error, info }
