<template>
  <div class="select-container">
    <div ref="reference" @click="toggleMenu">
      <slot name="input">
        <SelectHead
          :paramCode="curCode"
          :list="options.data"
          :isChecked="_isChecked">
        </SelectHead>
      </slot>
    </div>
    <transition name="transition-drop">
      <Drop :list="options.data"
            v-show="dropdown"
            @drop-close="_dropClose"
            @drop-select="_dropSelect"
      ></Drop>
    </transition>
  </div>
</template>
<script>
  import SelectHead from '../../components/select/selectHead'
  import Drop from '../../components/select/Drop'
  export default {
    name: 'JSelect',
    props: {
      options: Object,
    },
    data() {
      return {
        dropdown: false,
        curCode: ''
      }
    },
    provide() {
      return {
        options: this.options
      }
    },
    methods: {
      toggleMenu(e) {
        this.dropdown = !this.dropdown;
        e.stopPropagation();
      },
      _dropClose() {
        this.dropdown = false;
      },
      _dropSelect(code) {
        this.curCode = code

      }
    },
    computed: {
      _isChecked() {
        return this.curCode!==''? true: false
      }
    },
    watch: {
      curCode(val) {
        this.$emit('input', val)
      }
    },
    components: {
      SelectHead,
      Drop
    }
  }
</script>
<style lang="less" scoped type="text/less">
  .select-container {
    position: relative;
    width: 5rem;
    height: 40px;
  }
  .transition-drop-appear,.transition-drop-enter-active {
    -webkit-animation-duration: .3s;
    animation-duration: .3s;
    -webkit-animation-fill-mode: both;
    animation-fill-mode: both;
    -webkit-animation-play-state: paused;
    animation-play-state: paused
  }

  .transition-drop-leave-active {
    -webkit-animation-duration: .3s;
    animation-duration: .3s;
    -webkit-animation-fill-mode: both;
    animation-fill-mode: both;
    -webkit-animation-play-state: paused;
    animation-play-state: paused
  }

  .transition-drop-appear,.transition-drop-enter-active {
    -webkit-animation-name: ivuTransitionDropIn;
    animation-name: ivuTransitionDropIn;
    -webkit-animation-play-state: running;
    animation-play-state: running
  }

  .transition-drop-leave-active {
    -webkit-animation-name: ivuTransitionDropOut;
    animation-name: ivuTransitionDropOut;
    -webkit-animation-play-state: running;
    animation-play-state: running
  }

  .transition-drop-appear,.transition-drop-enter-active {
    opacity: 0;
    -webkit-animation-timing-function: ease-in-out;
    animation-timing-function: ease-in-out
  }

  .transition-drop-leave-active {
    -webkit-animation-timing-function: ease-in-out;
    animation-timing-function: ease-in-out
  }
</style>
