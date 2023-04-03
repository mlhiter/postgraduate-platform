import { createRouter, createWebHistory } from 'vue-router'
import { constRoutes } from './routes'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: constRoutes,
  scrollBehavior: () => ({ left: 0, top: 0 }),
})

//路由守卫
router.beforeEach(async (to) => {
  // 更新标题栏title
  const subtitle = to.meta.title
  if (subtitle) {
    document.title = subtitle
  }
})

export default router
