<template>
  <component
    :is="tag"
    ref="containerRef"
    class="overflow-y-auto"
    :style="{ maxHeight: computedHeight + 'px' }"
  >
    <slot />
  </component>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'ScrollingBlock',
  props: {
    tag: {
      default: 'div',
      type: String
    },
    sizeReduction: {
      default: 0,
      type: Number
    },
    resizeScrollDirection: {
      default: 'down',
      type: String,
      validator: (value) => ['down', 'up'].indexOf(value) !== -1
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
    getFixedBlockComponent () {
      let parent = this.$parent

      while (parent && parent.$options.name !== 'FixedBlock') {
        parent = parent.$parent
      }

      return parent
    },
    getContainerHeight () {
      return this.$refs.containerRef?.clientHeight || 0
    },
    scrollContainer () {
      if (this.resizeScrollDirection === 'up') {
        this.$refs.containerRef.scrollTop = 0
      } else {
        this.$refs.containerRef.scrollTop = this.$refs.containerRef.scrollHeight
      }
    },
    handleResize () {
      this.fixedBlockHeight = this.getFixedBlockComponent().computedHeight
      this.computedHeight = this.fixedBlockHeight - this.sizeReduction

      this.scrollContainer()
    }
  }
}
</script>
