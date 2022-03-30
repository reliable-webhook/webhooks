<template>
  Organization: {{ organizations[0]?.name }}
</template>

<script>
import { organizations, projects } from 'application/scripts/global_store'

export default {
  name: 'Project',
  computed: {
    projects: () => projects,
    organizations: () => organizations
  },
  mounted () {
    if (projects[0]) {
      this.$router.push({ name: 'project', params: { uuid: projects[0].id } })
    }
  }
}
</script>
