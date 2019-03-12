import Vue from 'vue'
import JToast from './toast/toast'
import JLoading from './loading/index'
import JMaskLayer from './maskLayer'
import JMessage from './message/index'

const components = [
   JToast,
  JLoading,
  JMaskLayer,
  JMessage
]

components.map(component => Vue.component(component.name, component))

Vue.prototype.$toast = JToast
Vue.prototype.$loading = JLoading
Vue.prototype.$message = JMessage

