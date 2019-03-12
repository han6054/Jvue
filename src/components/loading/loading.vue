<!-- loading -->
<template>
  <div class="loading" v-if="visible">
    <dl>
      <dt class="icon-loading"></dt>
      <dd class="text">{{message}}</dd>
    </dl>
  </div>
</template>
<script>
  export default {
    name: 'JLoading',
    props: {
      message: {
        type: String,
        default: '加载中'
      },
      visible: {
        type: Boolean,
        default: false
      }
    }
  }

</script>
<style scoped lang="less">
  .loading {
    width: 2.32rem;
    height: 1.76rem;
    position: fixed;
    z-index: 999;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);

    >dl {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      width: 2.32rem;
      height: 1.76rem;
      background: rgba(0, 0, 0, 0.5);
      border-radius: .08rem;

      .icon-loading {
        display: block;
        width: .56rem;
        height: .56rem;
        background: url('~assets/images/common/loading.png');
        background-size: 100% 100%;
        transform: rotate(360deg);
        animation: rotation 1s linear infinite;
      }
    }

    .text {
      margin: .2rem auto 0;
      line-height: .4rem;
      font-size: .24rem;
      text-align: center;
      color: #fff;
    }
  }

  @keyframes rotation {
    from {
      -webkit-transform: rotate(0deg);
    }

    to {
      -webkit-transform: rotate(360deg);
    }
  }

</style>
