<template>
  <div>
    <div
      v-if="visibleEditForm"
      class="flex"
    >
      <div class="flex flex-1 items-center focus:outline-none">
        <div class="flex-none px-2 py-1">
          <TerminalIcon />
        </div>
        <input
          ref="nameInputRef"
          v-model="name"
          type="text"
          placeholder="Type here your project name"
          :class="formattedProjectNameErrors ? 'text-red-500' : 'text-gray-700 dark:text-dark-50'"
          class="flex-1 appearance-none w-full py-3 text-sm font-medium focus:outline-none bg-white dark:bg-dark-800"
          @change="onChangeName"
          @input="onInputName"
          @keyup.enter="updateProject"
        >
        <p
          v-if="formattedProjectNameErrors"
          class="text-sm text-red-500"
        >
          {{ formattedProjectNameErrors }}
        </p>
      </div>
      <div
        class="flex-none p-2 text-gray-500 dark:text-dark-50 hover:text-gray-900 dark:hover:text-white hover:cursor-pointer"
        @click="updateProject"
      >
        <CheckIcon class="w-6 h-6" />
      </div>
    </div>
    <div
      v-else
      class="flex group hover:bg-gray-50 dark:hover:bg-dark-900"
    >
      <RouterLink
        :to="{ name: 'project', params: { uuid: project.id } }"
        class="flex flex-1 items-center focus:outline-none"
        @click="$emit('select')"
      >
        <div class="flex-none px-2 py-1">
          <TerminalIcon />
        </div>
        <p class="flex-1 py-3 text-sm font-medium">
          {{ project.name }}
        </p>
      </RouterLink>
      <div
        class="flex-none hidden p-3 group-hover:block hover:cursor-pointer dark:hover:text-white"
        @click="showEditForm"
      >
        <SpinnerIcon
          v-if="isSubmitting"
          class="w-5 h-5"
        />
        <PencilIcon
          v-else
          class="w-5 h-5"
        />
      </div>
    </div>
  </div>
</template>

<script>

import api from 'api'
import { updateProject } from 'application/scripts/global_store'
import { TerminalIcon, SpinnerIcon, CheckIcon, PencilIcon } from 'icons'
import { currentUser } from 'application/scripts/current_user'

export default {
  name: 'ProjectsPopoverNewButton',
  components: {
    TerminalIcon,
    SpinnerIcon,
    CheckIcon,
    PencilIcon
  },
  props: {
    project: {
      type: Object,
      required: true
    }
  },
  emits: ['select'],
  data () {
    return {
      isSubmitting: false,
      visibleEditForm: false,
      name: this.project.name,
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
    showEditForm () {
      if (currentUser.anonymous) {
        this.$modals.showModal('SignUpModal', 'Sign to edit projects')
      } else {
        this.visibleEditForm = true
        this.$nextTick(() => this.$refs.nameInputRef.focus())
      }
    },
    hideEditForm () {
      this.visibleEditForm = false
    },
    onChangeName (event) {
      this.name = event.target.value.trim()
    },
    onInputName () {
      this.errors.name = null
    },
    updateProject () {
      this.isSubmitting = true

      return api.put(`projects/${this.project.id}`, {
        data: { name: this.name.trim() }
      }).then((responce) => {
        const project = responce.data.data
        this.isSubmitting = false
        this.hideEditForm()
        this.$alerts.success('Updated')
        updateProject(project)
      }).catch((error) => {
        console.error(error)
        this.errors = error.response.data.errors
      })
    }
  }
}
</script>
