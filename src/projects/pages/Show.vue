<template>
  <div
    v-if="project"
    ref="pageContainer"
  >
    <div
      class="w-full"
    >
      <div
        ref="topContainer"
        class="p-2 sm:px-6 sm:pt-2 sm:pb-4 border-b border-gray-200 dark:border-dark-600"
      >
        <div class="grid grid-cols-12 md:gap-4 lg:gap-6">
          <div class="col-span-12 md:col-span-6">
            <ProjectConsumersList
              :project-id="project.id"
              :consumers="visibleConsumers"
              :with-create="visibleAllConsumersAndRecipients || visibleConsumers.length < 3"
              @update="setOffsetheight"
            />
          </div>
          <div class="col-span-12 md:col-span-6">
            <ProjectRecipientsList
              :project-id="project.id"
              :recipients="visibleRecipients"
              :with-create="visibleAllConsumersAndRecipients || visibleRecipients.length < 3"
              @update="setOffsetheight"
            />
          </div>
        </div>
        <div
          v-if="project.consumers.length > 2 || project.recipients.length > 2"
          class="relative flex width-fit place-content-center -bottom-8"
        >
          <span
            class="px-2 text-xs font-light bg-gray-300 dark:bg-dark-600 text-gray-700 dark:text-dark-50 rounded-b-md hover:bg-gray-400 dark:hover:bg-dark-500 hover:text-gray-200 dark:hover:text-white cursor-pointer"
            @click="showAllConsumersAndRecipients"
          >
            {{ visibleAllConsumersAndRecipients ? 'Collapse' : 'Show All' }}
          </span>
        </div>
      </div>
      <WebhookEntries
        ref="bottomContainerRef"
        :project="project"
        :height-offset="heightOffset"
      />
    </div>
  </div>
</template>

<script>
import { getProject } from 'application/scripts/global_store'
import WebhookEntries from 'webhook_entries/components/List'
import ProjectRecipientsList from 'webhook_recipients/components/List'
import ProjectConsumersList from 'webhook_consumers/components/List'

export default {
  name: 'ProjectShow',
  components: {
    WebhookEntries,
    ProjectConsumersList,
    ProjectRecipientsList
  },
  data () {
    return {
      visibleAllConsumersAndRecipients: false,
      heightOffset: 0
    }
  },
  computed: {
    project () {
      if (this.$route.params.uuid) {
        return getProject(this.$route.params.uuid)
      } else {
        return null
      }
    },
    visibleConsumers () {
      if (this.visibleAllConsumersAndRecipients) {
        return this.project.consumers
      } else {
        return this.project.consumers.slice(0, 3)
      }
    },
    visibleRecipients () {
      if (this.visibleAllConsumersAndRecipients) {
        return this.project.recipients
      } else {
        return this.project.recipients.slice(0, 3)
      }
    }
  },
  watch: {
    '$route' () {
      this.setOffsetheight()
    }
  },
  mounted () {
    this.setOffsetheight()
  },
  methods: {
    setOffsetheight () {
      this.$nextTick(() => {
        this.heightOffset = this.$refs.topContainer?.offsetHeight + 86
      })
    },
    showAllConsumersAndRecipients () {
      this.visibleAllConsumersAndRecipients = !this.visibleAllConsumersAndRecipients
    }
  }
}
</script>
