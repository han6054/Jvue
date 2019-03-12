<!-- 个人信息身份证下拉组件 -->
<template>
  <div class="picker-wrapper">
    <span @click.stop="show" :class="isSelect" v-text="getSelectText"></span><i class="icon-arrow-right"></i>
  </div>
</template>
<script>
  import iosSelect from 'iosselect'

  export default {
    name: 'JIDCardSelect',
    props: {
      labelKey: {
        type: String,
        default: 'value'
      },
      valueKey: {
        type: String,
        default: 'id'
      },
      defaultText: {
        type: String,
        default: '请选择'
      },
      title: {
        type: String,
        default: ''
      },
      value: {
        type: String,
        default: ''
      },
      always: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        selectItem: this.value,
        showLevel: { oneLevel: '', twoLevel: '', threeLevel: '' }
      }
    },
    watch: {
      value: {
        handler(newVal, oldVal) {
          if (newVal != oldVal) {
            this.selectItem = newVal
          }
        }
      }
    },
    computed: {
      getSelectText() {
        const { selectItem } = this;
        if (selectItem) {
          return selectItem
        }
        return this.defaultText
      },
      isSelect() {
        return !this.selectItem ? 'colorDark' : 'colorLight'
      }
    },
    methods: {
      setSelectItem() {
        const showDate = this.selectItem.split('-')
        const { showLevel, selectItem } = this
        if (selectItem) {
          showLevel.oneLevel = showDate[0]
          showLevel.twoLevel = showDate[1]
          showLevel.threeLevel = showDate[2]
        } else {
          showLevel.oneLevel = new Date().getFullYear()
          showLevel.twoLevel = new Date().getMonth() + 1
          showLevel.threeLevel = new Date().getDate()
        }
      },
      getYear(callback) {
        const { always } = this
        let _year, currentYear, beforeYear, nextYear, yearData = []
        _year = new Date()
        currentYear = _year.getFullYear()
        beforeYear = currentYear - 20
        nextYear = currentYear + 20
        for (let i = beforeYear; i < nextYear; i++) {
          yearData.push({ 'id': i, 'value': i + '年' })
        }
        if (always) {
          yearData.push({ 'id': '0', 'value': '长期有效' })
        }
        callback && callback(yearData)
      },
      getMonth(year, callback) {
        let monthData = [];
        if (year == 0) {
          monthData = [{ 'id': 0, 'value': '' }]
        } else {
          for (let i = 1; i < 13; i++) {
            monthData.push({ 'id': i, 'value': i + '月' })
          }
        }
        callback && callback(monthData)
      },
      getDay(year, month, callback) {
        const _getDay = new Date(year, month, 0).getDate();
        let realDay = []
        if (month == 0) {
          realDay = [{ 'id': '0', 'value': '' }]
        } else {
          for (let i = 1; i < _getDay + 1; i++) {
            realDay.push({ 'id': i, 'value': i + '日' })
          }
        }
        callback && callback(realDay)
      },
      show() {
        const { labelKey, valueKey, showLevel } = this;
        this.$emit('show');
        this.select = new iosSelect(3, [this.getYear, this.getMonth, this.getDay], {
          oneLevelId: showLevel.oneLevel,
          twoLevelId: showLevel.twoLevel,
          threeLevelId: showLevel.threeLevel,
          title: this.title, // 标题
          itemHeight: 44, // 每个元素的高度
          itemShowCount: 3, // 每一列显示元素个数，超出将隐藏
          callback: (level1, level2, level3) => { // 用户确认选择后的回调函数
            level1.id == 0 ? this.selectItem = '长期有效' : this.selectItem = `${level1[valueKey]}-${level2[valueKey]}-${level3[valueKey]}`
            this.$emit('input', this.selectItem)
          }
        })
      }
    },
    mounted() {
      this.setSelectItem()
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
