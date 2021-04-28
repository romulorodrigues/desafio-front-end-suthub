import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: () => import('@/layouts/MainLayout.vue'),
    children: [
      {path: '/', component: () => import('@/views/Home.vue')},
      {path: '/country/:code', name: 'Country', component: () => import('@/views/Country.vue')},
      {path: '/new-user', name: 'NewUser', component: () => import('@/views/NewUser.vue')},
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
