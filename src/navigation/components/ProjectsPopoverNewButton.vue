<template>
  <div>
    <div
      v-if="visibleCreationForm"
      class="flex items-center border-t border-gray-100 dark:border-dark-600 font-medium"
    >
      <div class="flex-auto">
        <input
          ref="newProjectInput"
          name="name"
          type="text"
          placeholder="Type here your project name"
          :class="formattedProjectNameErrors ? 'text-red-500' : 'text-gray-700'"
          class="flex-1 appearance-none w-full py-3 px-3 text-base focus:outline-none dark:bg-dark-800 dark:text-dark-50"
          @input="onInputName"
          @keyup.enter="createProject"
        >
        <p
          v-if="formattedProjectNameErrors"
          class="px-3 pb-1 text-sm text-red-500"
        >
          {{ formattedProjectNameErrors }}
        </p>
      </div>
      <div
        class="flex-none p-2 text-gray-500 hover:text-gray-900 hover:cursor-pointer dark:text-dark-50 dark:hover:text-white"
        @click="createProject"
      >
        <CheckIcon class="w-6 h-6" />
      </div>
    </div>
    <div
      v-else
      class="flex items-center border-t border-gray-100 dark:border-dark-600 px-2 py-3 font-medium hover:bg-gray-50 dark:hover:bg-dark-900 focus:outline-none cursor-pointer"
      @click="showCreationForm"
    >
      <PlusIcon class="w-6 h-6" />
      <p class="ml-1 text-sm font-bold">
        New project
      </p>
    </div>
  </div>
</template>

<script>

import api from 'api'
import { organizations, addProject } from 'application/scripts/global_store'
import { PlusIcon, CheckIcon } from 'icons'
import { currentUser } from 'application/scripts/current_user'

export default {
  name: 'ProjectsPopoverNewButton',
  components: {
    PlusIcon,
    CheckIcon
  },
  emits: ['success'],
  data () {
    return {
      visibleCreationForm: false,
      name: '',
      errors: {}
    }
  },
  computed: {
    formattedProjectNameErrors () {
      if (this.errors?.name) {
        return this.errors.name.join('; ')
      } else {
        return null
      }
    }
  },
  methods: {
    showCreationForm () {
      if (currentUser.anonymous) {
        this.$modals.showModal('SignUpModal', 'Sign up to add new project')
      } else {
        this.visibleCreationForm = true

        this.$nextTick(() => {
          this.$refs.newProjectInput.focus()
        })
      }
    },
    hideCreationForm () {
      this.visibleCreationForm = false
    },
    onInputName (event) {
      this.name = event.target.value.trim()
      this.errors.name = null
    },
    createProject () {
      return api.post('projects', {
        data: {
          name: this.name.trim(),
          organization_id: organizations[0]?.id
        }
      }).then((responce) => {
        const project = responce.data.data
        addProject(project)
        this.hideCreationForm()
        this.$alerts.success('Created')
        this.$router.push({ name: 'project', params: { uuid: project.id } })

        this.$emit('success')
      }).catch((error) => {
        console.error(error)
        this.errors = error.response.data.errors
      })
    }
  }
}
</script>
