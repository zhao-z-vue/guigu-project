import request from '@/utils/request'

const API = {
  LOGIN_URL: '/user/login',
  USER_INFO_URL: '/user/info'
}
// 登录接口方法
export const reqLogin = (data) => {
  return request({
    url: API.LOGIN_URL,
    method: 'post',
    data
  })
}
// 获取用户信息接口方法
export const reqUserInfo = () => {
  return request({
    url: API.USER_INFO_URL,
    method: 'get'
  })
}