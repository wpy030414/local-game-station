import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      alias: '/',
      path: '/home',
      name: '主页',
      component: () => import('@/views/Home.vue'),
    },
    {
      path: '/lib',
      name: '库',
      component: () => import('@/views/Lib.vue'),
    },
    {
      path: '/lib/:name',
      name: '游戏',
      component: () => import('@/views/Game.vue'),
    },
    {
      path: '/user',
      name: '个人',
      component: () => import('@/views/Account.vue'),
    },
    {
      path: '/setting',
      name: '设置',
      component: () => import('@/views/Setting.vue'),
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
