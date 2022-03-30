import qs from 'qs'
import api from 'api'
import vscode from 'application/scripts/vscode'

const UNSAFE_HEADERS_REGEXP = /^(?:host|origin|cookie|user-agent|content-length|version)$/i

function localRequest (entry, recipient, data) {
  if (vscode) {
    sendVsCodeRequest(entry, recipient, data)

    return new Promise(() => {})
  } else {
    return sendXhrRequest(recipient.method, recipient.url, entry.headers, data)
  }
}

function sendXhrRequest (method, url, headers, data) {
  let requestUrl = url
  let params = ''

  try {
    params = JSON.parse(data)
  } catch {
    params = data
  }

  if (method === 'GET') {
    requestUrl = [requestUrl, qs.stringify(typeof params === 'string' ? { data: params } : params)].join('?')
  }

  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()

    xhr.open(method, requestUrl, true)

    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        if (Math.floor(xhr.status / 100) === 2) {
          resolve(xhr)
        } else if (Math.floor(xhr.status / 100) === 0 && ['GET', 'POST'].includes(method)) {
          resolve(xhr)
        } else {
          reject(xhr)
        }
      }
    }

    if (process.env.ELECTRON) {
      Object.entries(headers).forEach(([key, value]) => {
        if (!key.match(UNSAFE_HEADERS_REGEXP)) {
          xhr.setRequestHeader(key, value)
        }
      })
    } else {
      xhr.setRequestHeader('Content-Type', 'text/plain')
    }

    if (method === 'GET') {
      xhr.send()
    } else {
      xhr.send(data)
    }
  })
}

function sendVsCodeRequest (entry, recipient, data) {
  vscode.postMessage({
    command: 'request',
    options: JSON.parse(JSON.stringify({ entry, recipient, data }))
  })
}

window.addEventListener('message', (event) => {
  const message = event.data

  if (!message.command) {
    return
  }

  const { entry, recipient } = message.data

  if (message.command === 'response.success') {
    api.post('webhook_events', {
      data: {
        webhook_entry_id: entry.id,
        project_id: recipient.project_id,
        source_id: recipient.id,
        event_type: 'deliver'
      }
    }).catch((error) => {
      console.error(error)
    })
  } else if (message.command === 'response.error') {
    api.post('webhook_events', {
      data: {
        webhook_entry_id: entry.id,
        project_id: recipient.project_id,
        source_id: recipient.id,
        event_type: 'fail',
        data: { status: message.data.status }
      }
    }).catch((error) => {
      console.error(error)
    })
  }
})

export { localRequest }
