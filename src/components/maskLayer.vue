<template>
  <div class="modal-mask" v-show="currentVisisble" @touchmove.prevent>
    <slot />
  </div>
</template>
<script>
  export default {
    name: 'JMaskLayer',
    props: {
      visible: {
        type: Boolean,
        default: false
      }
    },
    watch: {
      visible: function(val) {
        this.currentVisisble = val
      }
    },
    data() {
      return {
        currentVisisble: this.visible
      }
    },
    methods: {
      close() {
        this.currentVisisble = false
        this.$emit('close')
      },
      open() {
        this.currentVisisble = true
        this.$emit('open')
      }
    }
  }

</script>
<style lang="less" scoped>
  .modal-mask {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 999;
  }

</style>
