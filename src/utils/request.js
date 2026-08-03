import axios from 'axios'

// 1-引入element-plus的message组件
import { ElMessage } from 'element-plus'

// 1-通过axios的create方法创建一个axios实例
const request = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API,
  timeout: 5000
})
// 2-配置请求拦截器
request.interceptors.request.use((config) => {
  return config
})
// 3-配置响应拦截器
request.interceptors.response.use((responser) => {
  return responser.data,
    (error) => {
      const status = error.response.status
      if (status === 401) {
        ElMessage.error('登录过期，请重新登录')
        return Promise.reject(error)
      } else {
        ElMessage.error(error.response.data.message || '请求失败')
        return Promise.reject(error)
      }
    }
})
// 对外暴露axios实例
export default request
