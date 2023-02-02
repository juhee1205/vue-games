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
  {
    path: '/lotto',
    name: 'lotto',
    component: () => import('../views/Lotto.vue')
  },
  {
    path: '/leftRight',
    name: 'leftRight',
    component: () => import('../views/LeftRight.vue')
  },
  {
    path: '/1to50',
    name: '1to50',
    component: () => import('../views/1to50.vue')
  },
  {
    path: '/bingo',
    name: 'bingo',
    component: () => import('../views/Bingo.vue')
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router