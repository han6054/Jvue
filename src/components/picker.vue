<!-- 下拉组件 -->
<template>
  <div class="picker-wrapper">
    <span @click.stop="show" :class="isSelect" v-text="getSelectText"></span><i class="icon-arrow-right"></i>
  </div>
</template>
<script>
  import iosSelect from 'iosselect'
  export default {
    name: 'JPicker',
    props: {
      value: {
        type: [Number, String],
        default: ''
      },
      labelKey: {
        type: String,
        default: 'value'
      },
      valueKey: {
        type: String,
        default: 'id'
      },
      dataSource: {
        type: Array,
        default: Function
      },
      defaultText: {
        type: String,
        default: '请选择'
      },
      title: {
        type: String,
        default: ''
      }
    },
    data() {
      return {
        selectItem: {},
        currentValue: this.value
      }
    },
    watch: {
      value: {
        handler(newVal, oldVal) {
          if (newVal != oldVal) {
            this.currentValue = newVal
          }
        }
      }
    },
    computed: {
      getSelectText() {
        const currentValue = this.currentValue
        const { labelKey, valueKey, dataSource } = this
        if (currentValue) {
          const findItem = this.getOptionByValue(currentValue)
          if (findItem) {
            return findItem[labelKey]
          }
        }
        return this.defaultText
      },
      isSelect() {
        return !this.currentValue ? 'colorDark' : 'colorLight'
      }
    },
    methods: {
      getOptionByValue(value) {
        const { labelKey, valueKey, dataSource } = this;
        const findItem = dataSource.find((item) => {
          return item[valueKey] == value
        });
        return findItem;
      },
      show() {
        const { labelKey, valueKey } = this;
        this.$emit('show');
        this.select = new iosSelect(1, [this.dataSource], {
          oneLevelId: this.currentValue,
          title: this.title, // 标题
          itemHeight: 44, // 每个元素的高度
          itemShowCount: 3, // 每一列显示元素个数，超出将隐藏
          callback: (obj) => { // 用户确认选择后的回调函数
            this.currentValue = obj[valueKey]
            this.$emit('input', obj[valueKey])
            this.selectItem = obj
          }
        })
      }
    }
  }

</script>
<style lang="less">
  @import '~assets/less/ios-select';

  .picker-wrapper {
    display: flex;
    align-items: center;
    font-size: .28rem;

    span {
      margin-right: .16rem;
    }
  }

  .colorDark {
    color: #B2B2B2
  }

  .colorLight {
    color: #222;
  }

</style>
