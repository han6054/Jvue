<template>
  <transition name="toast-fadein">
    <div class="toast" v-show="value">{{message}}</div>
  </transition>
</template>
<script>
  export default {
    name: 'JToast',
    props: {
      message: {
        type: String
      },
      value: {
        type: Boolean,
        default: false,
      }
    }
  }
  </script>
<style lang="less" scoped>
  .toast {
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    z-index: 99;
    padding: 0.1rem 0.2rem;
    max-width: 6rem;
    width: auto;
    box-sizing: border-box;
    line-height: 0.5rem;
    font-size: 0.28rem;
    text-align: center;
    border-radius: 0.08rem;
    color: #ffffff;
    background-color: rgba(0, 0, 0, 0.72);

    &.toast-fadein-enter-active,
    &.toast-fadein-leave-active {
      transition: all 0.3s;
    }

    &.toast-fadein-enter,
    &.toast-fadein-leave {
      opacity: 0;
    }
  }

</style>
