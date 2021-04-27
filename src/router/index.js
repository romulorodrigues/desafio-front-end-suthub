import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: () => import('@/layouts/MainLayout.vue'),
    children: [
      {path: '/', component: () => import('@/views/Home.vue')},
      {path: '/country/:code', component: () => import('@/views/Country.vue')},
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
