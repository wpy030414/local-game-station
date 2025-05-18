import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: '库',
      component: () => import('@/views/HomeView.vue'),
    },
    {
      path: '/g/:name',
      name: '游戏',
      component: () => import('@/views/GameView.vue'),
    },
  ],
})

router.beforeEach((to, from, next) => {
  let dTitle = ''

  if (to.name == '库') {
    dTitle = '库'
  } else if (to.name == '游戏') {
    dTitle = `${to.params.name}` || '不存在的游戏'
  }

  document.title = `${dTitle} | 游戏驿站`
  next()
})

export default router
