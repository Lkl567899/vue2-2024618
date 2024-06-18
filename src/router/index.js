import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    component: () => import('@/views/Login')
  },
  {
    path: '/',
    redirect: '/home',
    component: () => import('@/views/Layout/index.vue'),
    children: [{
      path: 'home',
      component: () => import('@/views/Layout/Home.vue')
    },
    {
      path: 'user',
      component: () => import('@/views/Layout/User.vue')
    },
    {
      path: 'cart',
      component: () => import('@/views/Layout/Cart.vue')
    },
    {
      path: 'category',
      component: () => import('@/views/Layout/Category.vue')
    }]
  },
  {
    path: '/myorder',
    component: () => import('@/views/MyOrder')
  },
  {
    path: '/pay',
    component: () => import('@/views/Pay')
  },
  {
    path: '/prodetail/:id',
    component: () => import('@/views/ProDetail')
  },
  {
    path: '/search',
    component: () => import('@/views/Search/index.vue')
  },
  {
    path: '/searchlist',
    component: () => import('@/views/Search/list.vue')
  }

]

const router = new VueRouter({
  routes
})

export default router
