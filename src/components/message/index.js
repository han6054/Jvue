import Vue from 'vue';
import msgBoxVue from './message';

let merge = function (target) {
  for (let i = 1, j = arguments.length; i < j; i++) {
    let source = arguments[i];
    for (let prop in source) {
      if (source.hasOwnProperty(prop)) {
        let value = source[prop];
        if (value !== undefined) {
          target[prop] = value;
        }
      }
    }
  }
  return target;
};

let MessageBoxConstructor = Vue.extend(msgBoxVue);

let currentMsg, instance;
let msgQueue = [];

let initInstance = function () {
  instance = new MessageBoxConstructor({
    el: document.createElement('div')
  })
};

let showNextMsg = function () {
  if (!instance) {
    initInstance();
  }
  if (msgQueue.length > 0) {
    currentMsg = msgQueue.shift();
    let options = currentMsg.options;
    if (options.visible) {
      for (let prop in options) {
        if (options.hasOwnProperty(prop)) {
          instance[prop] = options[prop];
        }
      }
      document.body.appendChild(instance.$el);
    }
  }
};

let MessageBox = function (options) {
  if (typeof options === 'object') {
    msgQueue.push({
      options: options
    })
  }
  showNextMsg();
};

MessageBox.confirm = function (options) {
  if (typeof options === 'object') {
    options.visible = true
    options.showConfirmButton = true
    return MessageBox(options);
  }
};
MessageBox.alert = function (options) {
  if (typeof options === 'object') {
    options.visible = true
    return MessageBox(options)
  }
}
export default MessageBox;
