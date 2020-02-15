<template>
  <ul class="select-drop" :class="{select_Height:Height}">
    <li v-for="(item,index) in dropList" :key=index
        @click="check($event, index)">
      <div>{{item.name}}</div>
      <div v-show="item.checked" class="drop-check"></div>
    </li>
  </ul>
</template>
<script>
  export default {
    props: {
      list: [Array]
    },
    data() {
      return {
        dropList: [
          ...this.list,
        ],
        Height:false
      }
    },
    created(){
      this.dropList.map((d, idx) => {
        if(idx > 7){
          this.Height = true
        }
      });
    },
    methods: {
      check(e, index) {
        if(!this.dropList[index].hasOwnProperty('checked')) {
          this.dropList.map((d, idx) => {
            index == idx ?
              this.$set(this.dropList[idx], 'checked', true):
              this.$set(this.dropList[idx], 'checked', false);
          });
        } else {
          this.dropList.map(d => d.checked = false);
          this.dropList[index].checked = true
        }
        this.$emit('drop-close');
        this.$emit('drop-select', this.dropX);
        e.stopPropagation();
      }
    },
    computed: {
      dropX() {
        let code;
        this.dropList.some(d => {
          if(d.checked) {
            code = d.code
          }
        });
        return code
      }
    }
  }
</script>
<style lang="less" scoped type="text/less">
  .select_Height{
    height: 2.2rem;
  }
  .select-drop {
    width: 7rem;
    overflow: hidden;
    overflow-y: scroll;
    border-radius: 0 0 4px 4px;
    border: 1px solid #ccc;
    position: absolute;
    will-change: top, left;
    transform-origin: center top;
    top: 39px;
    left: 2%;
    background: #fff;
    /*   transform: translate(-50%);*/
    li {
      height: 32px;
      line-height: 32px;
      text-align: center;
      border-top: 1px solid #DEDEDE;
      cursor: pointer;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 10px;

    }
    li:nth-child(1) {
      border: none;
    }
    li:hover{
      background: #eee;
    }
    .drop-check {
      width: 0.15rem;
      height: 0.15rem;
      background: url("../../assets/images/components/checked.png");
      background-size: 100% 100%;
    }
  }
</style>
