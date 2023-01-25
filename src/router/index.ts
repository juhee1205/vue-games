import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/Main.vue')
  },
  {
    path: '/card',
    name: 'card',
    component: () => import('../views/CardGame.vue')
  },
  {
    path: '/RPS',
    name: 'rockPaperScissors',
    component: () => import('../views/RPS.vue')
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router