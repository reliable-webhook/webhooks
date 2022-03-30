<template>
  <component
    :is="tag"
    ref="containerRef"
  >
    <slot />
  </component>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'PageBlock',
  props: {
    tag: {
      default: 'div',
      type: String
    }
  },
  setup () {
    const containerRef = ref(null)

    return { containerRef }
  },
  data () {
    return {
      computedHeight: null,
      computedWidth: null
    }
  },
  created () {
    window.addEventListener('resize', this.handleResize)
  },
  unmounted () {
    window.removeEventListener('resize', this.handleResize)
  },
  mounted () {
    this.handleResize()
  },
  updated () {
    this.handleResize()
  },

  methods: {
    getContainerHeight () {
      return this.$refs.containerRef?.clientHeight || 0
    },
    getContainerWidth () {
      return this.$refs.containerRef?.clientWidth || 0
    },
    handleResize () {
      this.computedHeight = this.getContainerHeight()
      this.computedWidth = this.getContainerWidth()
    }
  }
}
</script>
