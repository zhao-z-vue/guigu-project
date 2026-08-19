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

// 创建应用实例
const app = createApp(App)

// 注册插件
app.use(ElementPlus, {
  locale: zhCn,
})
app.use(router)
app.use(globalComponents)
// 注册pinia
app.use(pinia)

// 生产环境：等 mock 服务器加载完成后再挂载应用
// 避免 onMounted 发请求时 mock 还没注册导致 404
if (import.meta.env.PROD) {
  import('./mockProdServer.js')
    .then(({ setupProdMockServer }) => setupProdMockServer())
    .catch((e) => console.error('mock 加载失败:', e))
    .finally(() => app.mount('#app'))
} else {
  // 开发环境用 vite-plugin-mock 中间件，直接挂载
  app.mount('#app')
}
