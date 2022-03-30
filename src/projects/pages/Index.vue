<template>
  <section>
    <div class="container max-w-7xl mx-auto p-3 sm:p-6 lg:p-8">
      <div class="p-3 mb-4 border border-gray-300">
        <div class="grid grid-cols-12">
          <div class="col-span-12 md:col-span-10">
            <h4 class="text-2xl leading-8 font-extrabold text-gray-700 sm:text-3xl sm:leading-9">
              {{ organization?.name || 'No name' }}
            </h4>
            <p class="mt-2 text-md leading-6 text-gray-500">
              All your projects in one place.
            </p>
          </div>
          <div class="col-span-12 md:col-span-2 text-center md:text-right mt-4 md:my-auto">
            <ProjectCreateButton childclass="w-full" />
          </div>
        </div>
      </div>
      <div class="grid gap-3 mb-8 md:grid-cols-2 lg:grid-cols-4">
        <ProjectCard
          v-for="project in projects"
          :key="project.id"
          :project="project"
        />
      </div>
    </div>
  </section>
</template>

<script>
import { projects, organizations } from 'application/scripts/global_store'
import ProjectCard from '../components/Card'
import ProjectCreateButton from '../components/CreateButton'

export default {
  name: 'ProjectsIndex',
  components: {
    ProjectCard,
    ProjectCreateButton
  },
  computed: {
    projects: () => projects,
    organization: () => organizations[0]
  }
}
</script>
