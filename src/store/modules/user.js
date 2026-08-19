import { defineStore } from 'pinia'
import { reqLogin, reqUserInfo } from '@/api/user'
import { constantRoutes, asyncRoutes, anyRoutes } from '@/router/routes'
import router from '@/router'

// 过滤掉不需要在菜单中显示的路由（hidden 为 true 的）
const filterRoutes = (routes) => {
  return routes.filter(route => {
    if (route.meta?.hidden) return false
    if (route.children && route.children.length > 0) {
      route.children = filterRoutes(route.children)
    }
    return true
  })
}

// 根据用户拥有的路由名称数组，过滤出可访问的异步路由
// 使用 reduce 返回新数组，避免修改原 asyncRoutes（刷新时会再次过滤）
const filterAsyncRoutes = (asyncRoutes, routes) => {
  return asyncRoutes.reduce((acc, item) => {
    if (routes.includes(item.name)) {
      const newItem = { ...item }
      if (newItem.children && newItem.children.length > 0) {
        newItem.children = filterAsyncRoutes(newItem.children, routes)
      }
      acc.push(newItem)
    }
    return acc
  }, [])
}

export const useUserStore = defineStore('User', {
  state: () => ({
    token: localStorage.getItem('token') || '',
    // 菜单数据：初始只有常量路由（登录后会合并异步路由）
    menuRoutes: filterRoutes(constantRoutes),
    username: '',
    avatar: '',
    // 用户拥有的异步路由名（用于动态路由注册）
    routes: [],
    // 标记动态路由是否已注册（解决刷新页面时动态路由丢失问题）
    hasRoutes: false
  }),
  actions: {
    // 登录
    async userLogin(data) {
      const res = await reqLogin(data)
      if (res.code === 200) {
        this.token = res.data.token
        // 计算当前用户需要展示的异步路由
        const userAsyncRoutes = filterAsyncRoutes(asyncRoutes, res.data.routes || [])
        // 合并常量路由和异步路由，过滤掉 hidden 的作为菜单数据
        this.menuRoutes = filterRoutes([...constantRoutes, ...userAsyncRoutes, ...anyRoutes])
          // 路由器目前只有常量路由：动态追加异步路由和任意路由
          ;[...userAsyncRoutes, ...anyRoutes].forEach((route) => {
            router.addRoute(route)
          })
        this.hasRoutes = true
        // 本地存储 token
        localStorage.setItem('token', this.token)
        return 'ok'
      } else {
        return Promise.reject(new Error(res.msg))
      }
    },
    // 计算并注册异步路由（用于刷新页面时重新注册）
    computeAsyncRoutes(routes) {
      const userAsyncRoutes = filterAsyncRoutes(asyncRoutes, routes || [])
      this.menuRoutes = filterRoutes([...constantRoutes, ...userAsyncRoutes, ...anyRoutes])
        ;[...userAsyncRoutes, ...anyRoutes].forEach((route) => {
          router.addRoute(route)
        })
      this.hasRoutes = true
    },
    // 获取用户信息方法
    async userInfo() {
      const res = await reqUserInfo()
      if (res.code === 200) {
        this.username = res.data.username
        this.avatar = res.data.avatar
        // 保存用户拥有的路由名（刷新时用来重新注册动态路由）
        this.routes = res.data.routes || []
        return res.data
      } else {
        return Promise.reject(new Error(res.msg))
      }
    },
    // 退出登录方法
    logout() {
      this.token = ''
      this.username = ''
      this.avatar = ''
      this.routes = []
      this.hasRoutes = false
      this.menuRoutes = filterRoutes(constantRoutes)
      localStorage.removeItem('token')
    }
  },
  getters: {}
})
