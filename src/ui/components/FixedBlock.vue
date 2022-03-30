<template>
  <component
    :is="tag"
    ref="containerRef"
    :style="containerStyles"
  >
    <slot />
  </component>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'FixedBlock',
  props: {
    tag: {
      default: 'div',
      type: String
    },
    heightPercent: {
      default: 100,
      type: Number,
      requred: true
    },
    fixedHeight: {
      default: false,
      type: Boolean
    },
    sizeReduction: {
      default: 0,
      type: Number
    }
  },
  setup () {
    const containerRef = ref(null)

    return { containerRef }
  },
  data () {
    return {
      computedHeight: null
    }
  },
  computed: {
    containerStyles () {
      const pageBlockWidth = this.getPageBlockComponent().computedWidth

      if (pageBlockWidth < 768) return {}

      if (this.fixedHeight) {
        return { height: this.computedHeight + 'px' }
      } else {
        return { maxHeight: this.computedHeight + 'px' }
      }
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
    getPageBlockComponent () {
      let parent = this.$parent

      while (parent && !['PageBlock', 'FixedBlock', 'ScrollingBlock'].includes(parent.$options.name)) {
        parent = parent.$parent
      }

      return parent
    },
    getContainerHeight () {
      return this.$refs.containerRef?.clientHeight || 0
    },
    handleResize () {
      const pageBlockHeight = this.getPageBlockComponent().computedHeight

      this.computedHeight = (pageBlockHeight - this.sizeReduction) * this.heightPercent / 100.0
    }
  }
}
</script>
