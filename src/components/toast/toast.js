import toast from './toast.vue'
import Vue from 'vue'

//  创建构造函数
const toastConstructor = Vue.extend(toast)
let instance,currentMsg

let initInstance = function () {
  instance = new toastConstructor({
    el: document.createElement('div')
  })
}

let showMsg = function () {
  if(!instance) {
    initInstance();
  }
  if(!instance.value) {
    for(let prop in currentMsg) {
      if(currentMsg.hasOwnProperty(prop)) {
        instance[prop] = currentMsg[prop];
      }
    }
    document.body.appendChild(instance.$el);
    Vue.nextTick(() => {
      instance.value = true;
      setTimeout(() => {
        instance.value = false;
      },2000)
    })
  }
}

const toastBox = (options, callback) => {
  if(typeof options === 'string') {
    currentMsg = {
      message: options
    }
  }
  showMsg()
}
export default toastBox




