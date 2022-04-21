const vscode = require('vscode')
const axios = require('axios')

const UNSAFE_HEADERS_REGEXP = /^(?:host|origin|cookie|user-agent|content-length|version)$/i

function activate (context) {
  context.subscriptions.push(vscode.commands.registerCommand('reliableWebhook.start', () => {
    ReliableWebhookPanel.createOrShow(context)
  }))

  if (vscode.window.registerWebviewPanelSerializer) {
    // Make sure we register a serializer in activation event
    vscode.window.registerWebviewPanelSerializer(ReliableWebhookPanel.viewType, {
      async deserializeWebviewPanel (webviewPanel, state) {
        // Reset the webview options so we use latest uri for `localResourceRoots`.
        webviewPanel.webview.options = getWebviewOptions(context.extensionUri)

        ReliableWebhookPanel.revive(webviewPanel, context)
      }
    })
  }
}

exports.activate = activate

function getWebviewOptions (extensionUri) {
  return {
    enableScripts: true,
    localResourceRoots: [vscode.Uri.joinPath(extensionUri, 'media')]
  }
}

function localRequest ({ recipient, entry, data }) {
  let url = recipient.url

  if (entry.url.includes('?')) {
    url = [url, entry.url.split('?')[1]].join('?')
  }

  const method = recipient.method.toLowerCase()
  const headers = Object.entries(entry.headers).reduce((acc, [key, value]) => {
    if (!key.match(UNSAFE_HEADERS_REGEXP)) {
      acc[key] = value
    }

    return acc
  }, {})

  if (method === 'get') {
    return axios.get(url, { params: { data } }, { headers })
  } else {
    return axios[method](url, data, { headers })
  }
}

class ReliableWebhookPanel {
  constructor (panel, context) {
    this._disposables = []
    this._panel = panel
    this._context = context
    this._extensionUri = context.extensionUri
    // Set the webview's initial html content
    this._update()
    // Listen for when the panel is disposed
    // This happens when the user closes the panel or when the panel is closed programmatically
    this._panel.onDidDispose(() => this.dispose(), null, this._disposables)

    this._panel.webview.onDidReceiveMessage(
      message => {
        switch (message.command) {
          case 'request':
            localRequest(message.options).then((result) => {
              this._panel.webview.postMessage({ command: 'response.success', data: { ...message.options } })
            }).catch((error) => {
              this._panel.webview.postMessage({
                command: 'response.error',
                data: {
                  ...message.options,
                  status: error.response ? error.response.status : 0
                }
              })
            })
          case 'user.jwt.update':
            this._context.globalState.update('reliable-webhook:jwt', message.jwt)
        }
      },
      null,
      this._disposables
    )
  }

  static createOrShow (context) {
    const column = vscode.window.activeTextEditor
      ? vscode.window.activeTextEditor.viewColumn
      : undefined
    // If we already have a panel, show it.
    if (ReliableWebhookPanel.currentPanel) {
      ReliableWebhookPanel.currentPanel._panel.reveal(column)
      return
    }
    // Otherwise, create a new panel.
    const panel = vscode.window.createWebviewPanel(ReliableWebhookPanel.viewType, 'Reliable Webhook', column || vscode.ViewColumn.One, getWebviewOptions(context.extensionUri))
    ReliableWebhookPanel.currentPanel = new ReliableWebhookPanel(panel, context)
  }

  static revive (panel, context) {
    ReliableWebhookPanel.currentPanel = new ReliableWebhookPanel(panel, context)
  }

  dispose () {
    ReliableWebhookPanel.currentPanel = undefined
    // Clean up our resources
    this._panel.dispose()
    while (this._disposables.length) {
      const x = this._disposables.pop()
      if (x) {
        x.dispose()
      }
    }
  }

  _update () {
    this._panel.title = 'Reliable Webhook'
    this._panel.webview.html = this._getHtmlForWebview(this._panel.webview)
  }

  _getHtmlForWebview (webview) {
    // Local path to main script run in the webview
    const scriptPathOnDisk = vscode.Uri.joinPath(this._extensionUri, 'media', 'main.js')
    // And the uri we use to load this script in the webview
    const scriptUri = scriptPathOnDisk.with({ scheme: 'vscode-resource' })
    // Local path to css styles
    const styleMainPath = vscode.Uri.joinPath(this._extensionUri, 'media', 'main.css')
    // Uri to load styles into webview
    const stylesMainUri = webview.asWebviewUri(styleMainPath)
    // Use a nonce to only allow specific scripts to be run
    const nonce = getNonce()
    return `<!DOCTYPE html>
            <html lang="en">
            <head>
              <meta charset="UTF-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">

              <link href="${stylesMainUri}" rel="stylesheet">

              <title>Reliable Webhook</title>
            </head>
            <body token="${this._context.globalState.get('reliable-webhook:jwt', '')}">
              <script nonce="${nonce}" src="${scriptUri}"></script>
            </body>
            </html>`
  }
}

ReliableWebhookPanel.viewType = 'reliableWebhook'

function getNonce () {
  let text = ''
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  for (let i = 0; i < 32; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length))
  }
  return text
}
