<template>
  <JMaskLayer :visible="visible">
    <div class="msgbox-wrapper">
      <div class="msgbox-content">
        <div class="msgbox-header">
          {{title}}
        </div>
        <div class="msgbox-message">
          {{message}}
        </div>
      </div>
      <div class="msgbox-button-wrapper border-top">
        <div v-if="showConfirmButton">
          <a @click="hide" class="border-right">{{cancelButtonText}}</a>
          <a @click="handleAction">{{confirmButtonText}}</a>
        </div>
        <div v-else>
          <a @click="hide">{{confirmButtonText}}</a>
        </div>
      </div>
    </div>
  </JMaskLayer>
</template>
<script>
  const CONFIRM_TEXT = '确定';
  const CANCEL_TEXT = '取消';
  export default {
    props: {
      visible: {
        type: Boolean,
        default: false
      },
      title: {
        type: String,
        default: '标题'
      },
      message: {
        type: String,
        default: '内容'
      },
      callback: {
        type: Function
      },
      showConfirmButton: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        currentVisisble: this.visible,
        cancelButtonText: CANCEL_TEXT,
        confirmButtonText: CONFIRM_TEXT
      }
    },
    watch:{
      currentVisisble(val) {
        this.visible = val
      }
    },
    methods: {
      handleAction(action) {
        this.callback(action)
        this.visible = false
      },
      hide() {
        this.visible = false
      }
    }
  }
</script>
<style lang="less" scoped>
  .msgbox-wrapper {
    width: 5rem;
    background: #fff;
    border-radius: .2rem;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;

    .msgbox-content {
      padding: .36rem .2rem;
    }
    .msgbox-header {
      font-size: .32rem;
      color: #222;
      font-weight: bold;
    }
    .msgbox-message {
      font-size: .24rem;
      color: #999;
      margin-top:.32rem;
      line-height: 1.5;
    }
    .msgbox-button-wrapper {
      > div {
        display: flex;
        align-items: center;
        > a {
          flex: 1;
          display: block;
          height: .88rem;
          line-height: .88rem;
          color: #0F80FE;
          font-size:.32rem;
        }
      }
    }
    .border-right {
      @media only screen and (-webkit-min-device-pixel-ratio: 2.0) {
        border-right: 0.5px solid #E4E4E4;
      }
      @media only screen and (-webkit-min-device-pixel-ratio: 3.0) {
        border-right: 0.33px solid #E4E4E4;
      }
    }
    .border-top {
      @media only screen and (-webkit-min-device-pixel-ratio: 2.0) {
        border-top: 0.5px solid #E4E4E4;
      }
      @media only screen and (-webkit-min-device-pixel-ratio: 3.0) {
        border-top: 0.33px solid #E4E4E4;
      }
    }
  }
</style>
