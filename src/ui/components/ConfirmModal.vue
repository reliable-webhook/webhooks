<template>
  <div @click="openModal">
    <slot />
    <TransitionRoot
      appear
      :show="visibleModal"
      as="template"
    >
      <Dialog
        as="div"
        @close="closeModal"
      >
        <div class="fixed inset-0 z-10">
          <div class="min-h-screen text-center">
            <DialogOverlay class="modal-overlay absolute w-full h-full bg-gray-300 dark:bg-transparent opacity-50" />

            <span
              class="inline-block h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>

            <TransitionChild
              as="template"
              enter="duration-300 ease-out"
              enter-from="opacity-0 scale-95"
              enter-to="opacity-100 scale-100"
              leave="duration-200 ease-in"
              leave-from="opacity-100 scale-100"
              leave-to="opacity-0 scale-95"
            >
              <div class="inline-block w-full max-w-xs p-6 my-24 text-left align-middle transition-all transform bg-white border border-gray-200">
                <DialogTitle
                  v-if="title"
                  as="h3"
                  class="mb-4 text-xl font-base leading-6 text-gray-900"
                >
                  {{ title }}
                </DialogTitle>
                <div
                  v-if="description"
                  class="mb-4"
                >
                  <p class="text-sm font-light text-gray-500 leading-6">
                    {{ description }}
                  </p>
                </div>

                <div class="flex justify-end space-x-4">
                  <UIButton
                    size="small"
                    class="w-1/2 md:w-1/3 lg:w-1/4 dark:bg-white dark:text-gray-900"
                    color-type="white"
                    @click="onCancel"
                  >
                    {{ cancelText }}
                  </UIButton>
                  <UIButton
                    size="small"
                    class="w-1/2 md:w-1/3 lg:w-1/4"
                    color-type="black"
                    @click="onConfirm"
                  >
                    {{ confirmText }}
                  </UIButton>
                </div>
              </div>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </TransitionRoot>
  </div>
</template>

<script>
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogOverlay,
  DialogTitle
} from '@headlessui/vue'

export default {
  name: 'UIConfirmModal',
  components: {
    TransitionRoot,
    TransitionChild,
    Dialog,
    DialogOverlay,
    DialogTitle
  },
  props: {
    cancelText: {
      type: String,
      default: 'Cancel'
    },
    confirmText: {
      type: String,
      default: 'Confirm'
    },
    title: {
      type: String,
      default: 'Are you sure?'
    },
    description: {
      type: String,
      default: 'The data will be deleted permanently'
    }
  },
  emits: ['confirm', 'cancel'],
  data () {
    return {
      visibleModal: false
    }
  },
  methods: {
    openModal () {
      this.visibleModal = true
    },
    closeModal () {
      this.visibleModal = false
    },
    onConfirm (event) {
      this.closeModal()
      this.$emit('confirm', event)
    },
    onCancel (event) {
      this.closeModal()
      this.$emit('cancel', event)
    }
  }
}
</script>
