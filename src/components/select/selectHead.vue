<template>
  <div>
    <div class="select-head">
      <div v-if="options && options.title">{{options.title}}</div>
      <div class="select-head-main"><div class="select-head-text" :style="classStyle">
        {{defaultTitle}}</div><div class="select" :class="[isChecked? 'select-checked': 'select-check']"></div></div>
    </div>
  </div>
</template>
<script>
  const DEFAULT = '全部';
  export default {
    name: 'HSSelectHead',
    props:{
      defaultText: {
        type: String,
      },
      paramCode: {
        type: [String, Number]
      },
      list: {
        type: [Array]
      },
      isChecked: {
        type: Boolean
      }
    },
    inject: ['options'],
    data() {
      return {
        dropdown:false,
      }
    },
    computed: {
      defaultTitle() {
        let defaultText;
        this.list.some(item => {
          if(item.code==this.paramCode) {
            defaultText = item.name;
          }
        });
        if(!defaultText) {
          defaultText= DEFAULT
        }
        return defaultText
      },
      classStyle() {
        return {
          color: this.defaultTitle == DEFAULT ? '#ccc': '#333'
        }
      }
    }
  }
</script>
<style lang="less" scoped type="text/less">
  .select-head {
    width: 5rem;
    border:1px solid #ccc;
    border-radius: 4px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding:10px 15px;
    cursor: pointer;
  }
  .select-head:hover{
    background: #eee;
  }
  .select {
    width: .4rem;
    height: .55rem;
    background-size: 100% 100%;
  }
  .select-check {
    background-image: url("~assets/images/components/select-check.png");
  }
  .select-checked {
    background-image: url("~assets/images/components/select-checked.png");
  }
  .select-head-main {
    display: flex;
  }
  .select-head-text {
    margin-right: 10px;
  }
</style>
