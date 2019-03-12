import Vue from 'vue'
import loading from './loading'
const loadingConstructor = Vue.extend(loading)
let currentMsg, instance, msgQueue = []
let initInstance = function () {
  instance = new loadingConstructor({
    el: document.createElement('div')
  })
}
let showNextMsg = function () {
  if (!instance) {
    initInstance()
  }
  if (msgQueue.length > 0) {
    currentMsg = msgQueue.shift()
    let options = currentMsg.options
    for (let prop in options) {
      if (options.hasOwnProperty(prop)) {
        instance[prop] = options[prop];
      }
    }
    document.body.appendChild(instance.$el)
  }
}
let loadingBox = function (options) {
  if (typeof options === 'object') {
    msgQueue.push({
      options: options
    })
  }
  showNextMsg()
}
loadingBox.show = function (options) {
  let newOptions = {}
  newOptions.visible = true
  newOptions.message = options || '加载中'
  return loadingBox(newOptions)
}
loadingBox.hide = function (options) {
  if (typeof options === 'undefined') {
    let newOptions = {}
    newOptions.visible = false
    return loadingBox(newOptions)
  }
}
export default loadingBox
