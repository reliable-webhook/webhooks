<template>
  <RouterLink
    v-slot="{ href, navigate }"
    :to="{ name: 'new_project' }"
    custom
  >
    <UIButton
      :href="href"
      :class="childclass"
      class="uppercase"
      color-type="black"
      size="small"

      @click="navigate"
    >
      Create Project
    </UIButton>
  </RouterLink>
</template>
<script>
export default {
  name: 'ProjectCreateButton',
  components: {
  },
  props: {
    childclass: {
      type: String,
      default: ''
    }
  }
}
</script>
