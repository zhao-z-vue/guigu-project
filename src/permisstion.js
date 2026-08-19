// 路由鉴权
// 未登录：只能访问登录页
// 已登录：不能访问登录页；刷新页面时重新注册动态路由
import router from '@/router'
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'
import pinia from '@/store'
import { useUserStore } from '@/store/modules/user'
import setting from '@/setting'

const userStore = useUserStore(pinia)

// 全局前置守卫：使用 return 风格（vue-router 5.2.0 不再推荐 next()）
router.beforeEach(async (to, from) => {
  document.title = `${setting.title} - ${to.meta.title}`
  nprogress.start()
  const token = userStore.token
  const username = userStore.username

  if (token) {
    // 已登录：不能访问登录页
    if (to.path === '/login') {
      return { path: '/home' }
    }

    // 有用户信息 + 动态路由已注册：直接放行
    if (username && userStore.hasRoutes) {
      return true
    }

    // 没有用户信息：先获取用户信息
    try {
      if (!username) {
        await userStore.userInfo()
      }
      // 刷新页面后动态路由会丢失，需要重新注册
      if (!userStore.hasRoutes) {
        userStore.computeAsyncRoutes(userStore.routes || [])
      }
      // 重新导航一次，确保刚注册的动态路由生效
      return { ...to, replace: true }
    } catch (error) {
      // token 过期或无效
      userStore.logout()
      return { path: '/login', query: { redirect: to.path } }
    }
  } else {
    // 未登录：只能访问登录页
    if (to.path === '/login') {
      return true
    }
    return { path: '/login', query: { redirect: to.path } }
  }
})

// 全局后置守卫：在路由切换后触发
router.afterEach((to, from) => {
  nprogress.done()
})
