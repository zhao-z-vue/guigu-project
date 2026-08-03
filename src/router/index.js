import { createRouter, createWebHashHistory } from 'vue-router'
import { constantRoutes } from './routes.js'
// 创建路由器
const router = createRouter({
  history: createWebHashHistory(),
  routes: constantRoutes,
  // 滚动行为
  scrollBehavior() {
    return {
      left: 0,
      top: 0
    }
  }
})
// 导出路路由器
export default router