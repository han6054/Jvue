<template>
  <div class="container">
    <h1> demo</h1>
    <div @click="toastOpen">toast 弹框 点击</div>
    <div @click="loadingOpen">$loading 弹框 点击</div>
    <div @click="messageOpen">message 双按钮 弹框 点击</div>
    <div @click="messageSinger">message 单按钮 弹框 点击</div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
      }
    },
    methods: {
      // 双按钮，回调
      messageOpen() {this.$message.confirm({
          callback: () => {
            alert('确定回调')
          }
        })},
      // 单按钮
      messageSinger() {this.$message.alert({})},
      //  loading 方法
      loadingOpen() {
        this.$loading.show()
        setTimeout(() => this.$loading.hide(), 1000)
      },
      //  toast 提示
      toastOpen() {this.$toast('toast show!')}
    }
  }
</script>
<style scoped lang="less">
  .container {
    h1 {
      font-size: .8rem;
    }
    div {
      font-size: .38rem;
    }
  }
</style>
