import Vue from 'vue'
import VueRouter from 'vue-router'
import login from '@/views/login'
import user from '@/views/user'
import home from '@/views/home'
import search from '@/views/search'
import searchArticle from '@/views/search/searchArticle'
import article from '@/views/article'
import edit from '@/views/user/edit'
import guide from '@/views/guide'


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
    meta: { home: true, keepAlive: true },
  },
  {
    path: '/search',
    component: search,
    meta: { footer: true },
  },
  {
    path: '/login',
    component: login,
    meta: { user: true },
  },
  {
    name: 'searchArticle',
    path: '/searchArticle/:keyword',
    component: searchArticle,
    meta: { footer: true, keepAlive: true },
  },
  {
    name: 'article',
    path: '/article/:id',
    component: article,
    meta: { footer: true }
  },
  {
    name: 'edit',
    path: '/edit',
    component: edit,
    meta: { footer: true }
  },
  {
    name: 'guide',
    path: '/guide',
    component: guide,
    meta: { footer: true }
  }
]

const router = new VueRouter({
  base: process.env.BASE_URL,
  routes
})

export default router
