import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Snake',
    component: () => import('../views/Snake.vue')
  },
  {
    path: '/bingo',
    name: 'Bingo',
    component: () => import('../views/Bingo.vue')
  },
  {
    path: '/bingo2',
    name: 'Bingo2',
    component: () => import('../views/Bingo2.vue')
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
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router