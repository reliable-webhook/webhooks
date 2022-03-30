<template>
  <div class="min-h-screen flex justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-6 md:space-y-8">
      <h2 class="text-center text-3xl font-extrabold text-gray-700">
        Create Project
      </h2>
      <div class="max-w-md  overflow-hidden border border-gray-300 p-5">
        <form
          class="space-y-4"
          @submit.prevent="createProject"
        >
          <UIInput
            v-model="name"
            label="Project name"
            name="name"
            type="text"
            required
            :error="errors?.name?.join('; ')"
            @input="onInputName"
          />
          <UIButton
            v-if="name.trim().length"
            :disabled="!!errors?.name"
            type="submit"
            class="w-full"
          >
            Create
          </UIButton>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import api from 'api'
import { organizations, addProject } from 'application/scripts/global_store'

export default {
  name: 'ProjectNew',
  components: {
  },
  data () {
    return {
      name: '',
      errors: {}
    }
  },
  methods: {
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
        this.$router.push({ name: 'project', params: { uuid: project.id } })
      }).catch((error) => {
        console.error(error)
        this.errors = error.response.data.errors
      })
    }
  }
}
</script>
