import { createConsumer } from '@rails/actioncable'

const consumer = createConsumer(process.env.WS_URL)

function subscribeToWebhookEvents (entryUuid, received) {
  return consumer.subscriptions.create({
    channel: 'WebhookEventsChannel',
    room: entryUuid
  }, {
    received
  })
}

function subscribeToWebhookEntries (projectUuid, received) {
  return consumer.subscriptions.create({
    channel: 'WebhookEntriesChannel',
    room: projectUuid
  }, {
    received
  })
}

function removeSubscription (subscription) {
  consumer.subscriptions.remove(subscription)
}

export { removeSubscription, subscribeToWebhookEvents, subscribeToWebhookEntries }
