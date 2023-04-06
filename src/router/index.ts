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
    if (subtitle == '首页') {
      document.title = '小青鱼 - 考研互动平台'
    } else {
      document.title = `${subtitle} - 小青鱼`
    }
  }
})
// FIXME: 切换路由就会失去页面
export default router
