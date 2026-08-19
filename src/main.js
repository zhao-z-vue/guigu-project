import { createApp } from 'vue'
import App from './App.vue'
// 引入element-plus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
// 配置element-plus国际化
import zhCn from 'element-plus/es/locale/lang/zh-cn'
// 引入svg图标
import 'virtual:svg-icons-register'
// 引入组件
import globalComponents from './components/index.js'
// 引入全局样式
import './styles/index.scss'
// 引入路由
import router from './router/index.js'
// 引入pinia
import pinia from './store/index.js'
// 引入路由鉴权
import './permisstion.js'

async function bootstrap() {
  // 生产环境：先加载 mock 服务器
  // 必须在 app.use(router) 之前完成，否则路由守卫 beforeEach 会提前触发
  // 导致 userInfo 请求发出时 mock 还没注册，返回 404 提示"请求失败"
  if (import.meta.env.PROD) {
    try {
      const { setupProdMockServer } = await import('./mockProdServer.js')
      setupProdMockServer()
    } catch (e) {
      console.error('mock 加载失败:', e)
    }
  }

  // 创建应用实例
  const app = createApp(App)

  // 注册插件
  app.use(ElementPlus, {
    locale: zhCn,
  })
  // 注册 router（触发初始导航，此时 mock 已就绪）
  app.use(router)
  app.use(globalComponents)
  // 注册pinia
  app.use(pinia)

  // 挂载应用
  app.mount('#app')
}

bootstrap()
