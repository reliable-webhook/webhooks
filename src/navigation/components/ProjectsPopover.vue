<template>
  <Popover
    v-slot="{ open, close }"
    class="relative"
  >
    <PopoverButton
      ref="popoverButton"
      class="text-gray-600 dark:text-dark-50 inline-flex items-center py-2 text-sm font-semibold focus:outline-none"
    >
      <span>{{ currentProjectName }}</span>
      <ChevronDownIcon
        v-if="!open"
        class="w-5 h-5 ml-2 transition duration-150 ease-in-out group-hover:text-opacity-80"
      />
      <ChevronUpIcon
        v-else
        class="w-5 h-5 ml-2 transition duration-150 ease-in-out group-hover:text-opacity-80"
      />
    </PopoverButton>

    <transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="translate-y-1 opacity-0"
      enter-to-class="translate-y-0 opacity-100"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="translate-y-0 opacity-100"
      leave-to-class="translate-y-1 opacity-0"
    >
      <PopoverPanel
        class="bg-white dark:bg-dark-800 absolute z-10 w-screen max-w-sm mt-2 transform"
      >
        <div class="overflow-hidden border dark:border-dark-600 rounded-sm transition duration-150 ease-in-out">
          <div
            v-if="projects.length"
          >
            <ProjectsPopoverEditButton
              v-for="project in projects"
              :key="project.id"
              :project="project"
              @select="close"
            />
          </div>

          <ProjectsPopoverNewButton @success="close" />
        </div>
      </PopoverPanel>
    </transition>
  </Popover>
</template>

<script>
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/vue'
import { projects, getProject } from 'application/scripts/global_store'
import { ChevronDownIcon, ChevronUpIcon } from 'icons'
import ProjectsPopoverNewButton from './ProjectsPopoverNewButton'
import ProjectsPopoverEditButton from './ProjectsPopoverEditButton'

export default {
  name: 'ProjectsPopover',
  components: {
    Popover,
    PopoverButton,
    PopoverPanel,
    ChevronDownIcon,
    ChevronUpIcon,
    ProjectsPopoverNewButton,
    ProjectsPopoverEditButton
  },
  computed: {
    projects: () => projects,
    sortedProjects () {
      return [...this.projects].sort((a, b) => new Date(a.created_at) - new Date(b.created_at))
    },
    currentProject () {
      if (this.$route.params.uuid) {
        return getProject(this.$route.params.uuid)
      } else {
        return {}
      }
    },
    currentProjectName () {
      if (this.currentProject?.name) {
        return this.currentProject?.name
      } else {
        return 'Projects'
      }
    }
  }
}
</script>
