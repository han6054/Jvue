<template>
  <div class="container">
    <h1> demo</h1>
    <div @click="toastOpen">toast 弹框 点击</div>
    <div @click="loadingOpen">$loading 弹框 点击</div>
    <div @click="messageOpen">message 双按钮 弹框 点击</div>
    <div @click="messageSinger">message 单按钮 弹框 点击</div>
    <div>选择个人身份证日期 --- <JIDCardSelect v-model="idCard.id" :always="idCard.always"></JIDCardSelect></div>
    <div>单选组件 ---  <JPicker :title="select.title" :dataSource="select.data" v-model="fromSelect.id"></JPicker></div>
    <div>下拉选择 ---  </div>
    <div><JSelect :options="selectOptions" v-model="value1"></JSelect></div>
    <div>轮盘</div>
    <roulette
      :prize="roulette.prize"
      :is-allow.sync="roulette.isLock"
      :beforeHandle="_beforeHandle"
      :afterHandle="_afterHandle"
      :angles="roulette.angles">
    </roulette>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        idCard: {
          id: '',
          always: true
        },
        // 单选
        select: {
          title: '测试标题',
          data: [{ 'id': '10001', 'value': '演示数据1' }, { 'id': '10002', 'value': '演示数据2' }]
        },
        fromSelect: {
          id: ''
        },
        selectOptions: {
          title: '产品线',
          data: [{
            name: '中国银行线上',
            code: '1'
          },
            {
              name: '招商银行线上',
              code: '2'
            }],
        },
        value1: '',
        // 轮盘
        roulette: {
          prize: null,
          isLock: false,
          angles:[0, 60, 120, 180, 240, 300],
        }
      }
    },
    methods: {
      _beforeHandle(resolve, reject) {
        // ajax 获取奖品
        setTimeout(() => {
          this.roulette.prize = 2;
          this.roulette.isLock = true;
          resolve();
        },500);
        // 增加抽奖机会
        setTimeout(() =>{
          this.roulette.isLock = false;
        },3000)
      },
      _afterHandle() {
        // callback
      },
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
      align-items: center;
      justify-content: center;
      display: flex;
      font-size: .38rem;
    }
  }
</style>
