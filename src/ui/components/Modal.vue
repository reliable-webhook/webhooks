<template>
  <TransitionRoot
    appear
    :show="visible"
    as="template"
  >
    <Dialog
      as="div"
      :initial-focus="{ focus: (() => {})}"
    >
      <div class="fixed inset-0 z-10 overflow-y">
        <div class="min-h-screen text-center">
          <DialogOverlay
            class="modal-overlay absolute w-full h-full bg-gray-300 dark:bg-transparent opacity-50"
            @click="onCancel"
          />

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
            <div
              class="inline-block w-full p-6 my-24 text-left align-middle transition-all transform bg-white border border-gray-200"
              :class="sizeClasses[size]"
            >
              <DialogTitle
                v-if="title"
                as="h3"
                class="mb-6 text-2xl font-light leading-6 text-gray-900"
              >
                {{ title }}
              </DialogTitle>
              <div>
                <slot />
              </div>
              <div
                v-if="withCancel || withConfirm"
                class="flex justify-end space-x-4"
              >
                <UIButton
                  v-if="withCancel"
                  size="small"
                  class="w-1/2 md:w-1/3 lg:w-1/4 dark:bg-white dark:text-gray-900"
                  color-type="white"
                  @click="onCancel"
                >
                  {{ cancelText }}
                </UIButton>
                <UIButton
                  v-if="withConfirm"
                  size="small"
                  class="w-1/2 md:w-1/3 lg:w-1/4"
                  color-type="black"
                  type="submit"
                  :loading="confirmLoading"
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
  name: 'UIModal',
  components: {
    TransitionRoot,
    TransitionChild,
    Dialog,
    DialogOverlay,
    DialogTitle
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    confirmLoading: {
      type: Boolean,
      default: false
    },
    cancelText: {
      type: String,
      default: 'Cancel'
    },
    confirmText: {
      type: String,
      default: 'Confirm'
    },
    withCancel: {
      type: Boolean,
      required: false,
      default: true
    },
    withConfirm: {
      type: Boolean,
      required: false,
      default: true
    },
    size: {
      type: String,
      required: false,
      default: 'medium'
    },
    title: {
      type: String,
      required: false,
      default: ''
    }
  },
  emits: ['confirm', 'cancel'],
  computed: {
    sizeClasses () {
      return {
        small: 'max-w-sm',
        medium: 'max-w-md',
        large: 'max-w-lg'
      }
    }
  },
  methods: {
    onConfirm (event) {
      this.$emit('confirm', event)
    },
    onCancel (event) {
      this.$emit('cancel', event)
    }
  }
}
</script>
