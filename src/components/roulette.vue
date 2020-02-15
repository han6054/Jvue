<template>
  <div>
    <div class="roll-wrapper">
      <div class="roll-container tt" :style="{transform:rotate_angle,transition:rotate_transition}"></div>
      <div class="roll-pointer" @click="rotate_handle"></div>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'roulette',
    props:{
      CurrentDeg: {
        type: [Number, String],
        default: 0
      },
      prize: {
        type: [Number, String],
        default: null,
        require: true
      },
      isAllow: {
        type: false,
        require: true
      },
      beforeHandle: {
        type: Function,
        default() { throw new Error('you must define beforeHandle before draw a roulette '); }
      },
      afterHandle: {
        type: Function,
        default() { console.warn('you can use afterHandle after roulette'); }
      },
      angles: {
        type: Array
      }
    },
    data() {
      return {
        rotate_angle: 0, //将要旋转的角度
        rotate_transition: "all 6s ease-in-out", // 初始化选中的过度属性控制
        start_rotating_deg: this.CurrentDeg, // 初始旋转角度
        previous: 0, // 上次点击的时间
        curAngles: this.angles
      }
    },
    methods: {
      rotate_handle() {
        if(!this.isAllow) {
          let promise = () => {
            return new Promise((resolve, reject) => {
              console.log(2);
              this.beforeHandle(resolve, reject);
            })
          };
          let start = async () => {
            try {
              await promise();
              this.throttle(this.rotating, 6000)
            } catch (e) {
              e();
            }
          };
          start();
          start = null;
        }
      },
      rotating() {
        const result_index = this.prize ; // 转到哪一块对应获得奖品
        const result_angle = this.curAngles; // 轮盘上奖品角度
        const rand_circle = 4; // 初始化转盘圈数
        const rotate_angle = result_index && this.start_rotating_deg + rand_circle * 360 + result_angle[result_index] - this.start_rotating_deg % 360;
        this.start_rotating_deg = rotate_angle;
        this.rotate_angle = "rotate(" + rotate_angle + "deg)";
        setTimeout(() => {
          this.afterHandle()
        }, 6000)
      },
      throttle(func, wait) {
        let now = Date.now();
        if(now - this.previous > wait) {
          func.apply(this, arguments);
          this.previous = now
        }
      }
    }
  }
</script>
<style scoped lang="less">
  .tt {
    margin: 0 auto;
  }
  .roll-wrapper {
    position: relative;
  }
  .roll-container {
    width: 5.99rem;
    height: 5.99rem;
    background-image: url("~assets/images/roulette/roll.png");
    background-size: cover;
  }
  .roll-pointer {
    position: absolute;
    transition: all 3s ease-out;
    top: 50%;
    left:50%;
    transform: translate(-50%, -50%);
    width: 1.47rem;
    height: 1.71rem;
    background-image: url("~assets/images/roulette/btn_start.png");
    background-size: cover;
  }
</style>
