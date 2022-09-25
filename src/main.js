import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/assets/less/base.less'
import '@/assets/less/normalize.less'
import 'amfe-flexible/index.js'
import myfooter from '@/components/footer'
import * as api from '@/api'

import '@/assets/font/one/iconfont.css'

Vue.config.productionTip = false

Vue.component("myfooter", myfooter)

Vue.prototype.$api = api

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
