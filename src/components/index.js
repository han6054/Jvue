import Vue from 'vue'
import JToast from './toast/toast'

const components = [
   JToast,
]

components.map(component => Vue.component(component.name, component))

export {
  JToast,
}
