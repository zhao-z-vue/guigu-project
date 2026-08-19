import axios from 'axios'
import { ElMessage } from 'element-plus'
import { useUserStore } from '@/store/modules/user'

// 1-通过axios的create方法创建一个axios实例
const request = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API,
  timeout: 5000
})

// 2-配置请求拦截器（在请求发出前执行）
request.interceptors.request.use((config) => {
  // 获取仓库内部token，登陆成功以后给服务器携带公共参数
  // 注意：useUserStore() 必须在拦截器回调里调用（延迟执行），不能在文件顶层调用
  // 否则会因为循环依赖（request→userStore→api→request）遇到 TDZ 报错白屏
  const UserStore = useUserStore()
  if (UserStore.token) {
    config.headers.token = UserStore.token
  }
  return config
})

// 3-配置响应拦截器（收到服务器响应后执行）
request.interceptors.response.use(
  (response) => {
    return response.data
  },
  (error) => {
    const status = error.response?.status
    if (status === 401) {
      ElMessage.error('登录过期，请重新登录')
    } else {
      ElMessage.error(error.response?.data?.message || '请求失败')
    }
    return Promise.reject(error)
  }
)

export default request
