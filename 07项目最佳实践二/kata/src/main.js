import Vue from 'vue'
import App from './App.vue'
import { create } from '@/utils/create'
import router from './router'
import store from './store'
import './icons'
import "./plugins/element.js";
import "./permission"

Vue.config.productionTip = false
Vue.prototype.$create = create

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
