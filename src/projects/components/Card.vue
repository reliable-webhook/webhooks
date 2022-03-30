<template>
  <RouterLink
    :to="{ name: 'project', params: { uuid: project.id } }"
    custom
  >
    <div
      class="flex items-center p-3 bg-white border-2 border-gray-200 hover:scale-105 transition transform duration-500 cursor-pointer"
    >
      <div class="p-3 mr-4 bg-black text-white">
        <TerminalIcon />
      </div>
      <div>
        <p class="mb-1 text-sm font-medium text-gray-900">
          {{ project.name }}
        </p>
        <p class="text-sm font-normal text-gray-300">
          {{ formattedProjectCreatedAt }}
        </p>
      </div>
    </div>
  </RouterLink>
</template>
<script>
import { TerminalIcon } from 'icons'

export default {
  name: 'ProjectCard',
  components: {
    TerminalIcon
  },
  props: {
    project: {
      type: Object,
      required: true
    }
  },
  computed: {
    formattedProjectCreatedAt () {
      return new Intl.DateTimeFormat('en-GB', { dateStyle: 'long' }).format(new Date(this.project.created_at))
    }
  }
}
</script>
