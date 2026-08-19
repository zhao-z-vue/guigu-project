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
// 引入axios
import axios from 'axios'
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

// 生产环境启动 mock 服务器（动态导入，不影响开发环境）
if (import.meta.env.PROD) {
  import('./mockProdServer.js').then(({ setupProdMockServer }) => {
    setupProdMockServer()
  })
}

// 挂载应用
app.mount('#app')
