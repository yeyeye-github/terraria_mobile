import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/assets/less/base.less'
import '@/assets/less/normalize.less'
import 'amfe-flexible/index.js'
import myfooter from '@/components/footer'
import * as api from '@/api'
import * as tool from '@/tool'

import '@/assets/font/one/iconfont.css'

Vue.config.productionTip = false

Vue.component("myfooter", myfooter)

Vue.prototype.$api = api
Vue.prototype.$tool = tool

Date.prototype.format = function (fmt) {
  var o = {
    "M+": this.getMonth() + 1,                 //月份 
    "d+": this.getDate(),                    //日 
    "h+": this.getHours(),                   //小时 
    "m+": this.getMinutes(),                 //分 
    "s+": this.getSeconds(),                 //秒 
    "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
    "S": this.getMilliseconds()             //毫秒 
  };
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
  }
  for (var k in o) {
    if (new RegExp("(" + k + ")").test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    }
  }
  return fmt;
}

new Vue({
  beforeCreate() {
    Vue.prototype.$bus = this
  },
  router,
  store,
  render: h => h(App)
}).$mount('#app')
