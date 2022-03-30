<template>
  <RecipientControl
    v-if="visibleCreationForm"
    :project-id="projectId"
    @create="handleRecipientCreate"
  />
  <UIButton
    v-else
    size="medium"
    class="w-full"
    color-type="gray"
    icon="PlusIcon"
    data-role="add-destination"
    border-type="dashed"
    @click="showCreationForm"
  >
    Add Destination
  </UIButton>
</template>
<script>
import RecipientControl from './Control'

export default {
  name: 'RecipientNewButton',
  components: {
    RecipientControl
  },
  props: {
    projectId: {
      type: String,
      required: true
    }
  },
  emits: ['create'],
  data () {
    return {
      visibleCreationForm: false
    }
  },
  methods: {
    showCreationForm () {
      this.visibleCreationForm = true
    },
    hideCreationForm () {
      this.visibleCreationForm = false
    },
    openModal () {
      this.$refs.modalRef.show()
    },
    handleRecipientCreate (newRecipient) {
      this.$emit('create', newRecipient)
      this.hideCreationForm()
    }
  }
}
</script>
