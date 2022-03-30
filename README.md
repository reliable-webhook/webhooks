# Reliable Webhook

Develop and debug webhook integrations with an easy-to-use GUI app. Relay requests to localhost, inspect data, and retry failed attempts.

[![App](https://user-images.githubusercontent.com/5418788/161380392-78b1a588-75ce-4a30-bcf1-38acb8879752.png)](https://www.reliablewebhook.com/app)

## Installation

* [VS Code](https://marketplace.visualstudio.com/items?itemName=ReliableWebhook.ReliableWebhook) - Install extension and open Reliable Webhook in VS Code using Command Palette (press <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>P</kbd> and type 'Reliable Webhook').

* [Web App](https://www.reliablewebhook.com/app) - Chrome Web App doesn't support PUT, PATCH, DELETE methods due to CORS restrictions.

* [Desktop](https://github.com/reliable-webhook/webhooks/releases/tag/latest) - Electron desktop apps are available for macOS, Linux and Windows platforms

### Desktop

## Usage

1. Copy webhook URL

<img width="588" alt="figure1" src="https://user-images.githubusercontent.com/5418788/161380821-b12e71db-58ba-4bda-81ac-a18472202fc3.png">

2. Set webhook endpoint

<img width="588" alt="figure2" src="https://user-images.githubusercontent.com/5418788/161380796-c82f6103-455b-4874-98f8-f4a7a19974d2.png">

3. Add destination URL

<img width="537" alt="figure3" src="https://user-images.githubusercontent.com/5418788/161380805-a05ab336-11b2-4159-aa00-ed48dcf333e5.png">


## Build

### VS Code

```bash
yarn build:vscode:prod && cd vscode && vsce package
```

### Web App

```bash
yarn serve
```

### Desktop

```
yarn build:electron:prod && yarn electron:release
```

## 🇺🇦 Charityware

ReliableWebhook is a charityware. If you find it useful, you can make a donation to help Ukraine through the [Come Back Alive](https://www.comebackalive.in.ua/donate) charity fund.

## License

MIT
