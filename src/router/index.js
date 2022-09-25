import Vue from 'vue'
import VueRouter from 'vue-router'
import login from '@/views/login'
import user from '@/views/user'
import home from '@/views/home'


const originalPush = VueRouter.prototype.push
//修改原型对象中的push方法
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

Vue.use(VueRouter)

const routes = [
  {
    path: '*',
    redirect: '/home'
  },
  {
    path: '/user',
    component: user,
    meta: { user: true },
  },
  {
    path: '/home',
    component: home,
    meta: { home: true,keepAlive:true }
  },
  {
    path: '/login',
    component: login,
    meta: { user: true },
  }
]

const router = new VueRouter({
  base: process.env.BASE_URL,
  routes
})

export default router
