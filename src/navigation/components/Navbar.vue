<template>
  <Disclosure
    v-if="currentUser.id"
    as="nav"
    class="text-gray-700 bg-gray-50 border-b border-gray-100 dark:border-dark-600 py-1 dark:bg-dark-800 dark:text-dark-50"
  >
    <div class="px-2 sm:px-6">
      <div class="relative flex items-center justify-between h-10">
        <div class="flex-1 flex items-center justify-start w-1/3">
          <ProjectsPopover />
        </div>
        <div class="flex flex-1 justify-center items-center space-x-4 w-1/3">
          <UIAlert
            :message="alertMessage?.message"
            :type="alertMessage?.type"
          />
        </div>
        <div class="flex justify-end items-center space-x-2 w-1/3">
          <UIButton
            size="small"
            @click="onInviteUserClick"
          >
            Invite User
          </UIButton>
          <ShareButton />
          <UIButton
            v-if="currentUser.anonymous"
            size="small"
            color-type="black"
            @click="onSignInClick"
          >
            Log In
          </UIButton>
          <ProfileDropdown v-else />
          <GithubLink class="mr-2" />
          <ThemeToggle class="mr-2" />
        </div>
      </div>
    </div>

    <DisclosurePanel class="sm:hidden">
      <div class="px-2 pt-2 pb-3 space-y-1">
        <RouterLink
          v-for="project in projects"
          :key="project.id"
          :to="{ name: 'project', params: { uuid: project.id } }"
          class="flex items-center text-gray-700 hover:bg-gray-200 hover:text-gray-900 px-3 py-2 text-base font-medium"
        >
          <TerminalIcon />
          <p class="ml-1 text-sm font-medium">
            {{ project.name }}
          </p>
        </RouterLink>
      </div>
    </DisclosurePanel>
  </Disclosure>
</template>

<script>
import ThemeToggle from './ThemeToggle'
import GithubLink from './GithubLink'
import ShareButton from './ShareButton'
import ProfileDropdown from './ProfileDropdown'
import ProjectsPopover from './ProjectsPopover'
import { Disclosure, DisclosurePanel } from '@headlessui/vue'
import { TerminalIcon } from 'icons'
import { alertMessages } from 'application/scripts/messages_store'
import { projects } from 'application/scripts/global_store'
import { currentUser } from 'application/scripts/current_user'
import UIAlert from 'ui/components/Alert'

export default {
  name: 'Navbar',
  components: {
    Disclosure,
    DisclosurePanel,
    ProfileDropdown,
    ProjectsPopover,
    TerminalIcon,
    ThemeToggle,
    GithubLink,
    ShareButton,
    UIAlert
  },
  computed: {
    projects: () => projects,
    currentUser: () => currentUser,
    alertMessage () {
      if (alertMessages.length) {
        return [...alertMessages].pop()
      } else {
        return null
      }
    },
    currentRouteName () {
      return this.$route.name
    }
  },
  methods: {
    onSignInClick () {
      this.$modals.showModal('SignUpModal', 'Sign up to unlock all features')
    },
    onInviteUserClick () {
      if (currentUser.anonymous) {
        this.$modals.showModal('SignUpModal', 'Sign up to invite users')
      } else {
        this.$modals.showModal('InviteModal')
      }
    }
  }
}
</script>
