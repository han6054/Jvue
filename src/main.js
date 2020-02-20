// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import {JToast} from './components/index'

Vue.config.productionTip = false;

//
window.addEventListener("storage", function (e) {
  // console.log(e);
  alert(1)
});
// var orignalSetItem = localStorage.setItem;
// localStorage.setItem = function(key,newValue){
//   var setItemEvent = new Event("setItemEvent");
//   setItemEvent.newValue = newValue;
//   window.dispatchEvent(setItemEvent);
//   orignalSetItem.apply(this,arguments);
// };
// window.addEventListener("setItemEvent", function (e) {
//   alert(e.newValue);
// });
// localStorage.setItem("name","han");

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
