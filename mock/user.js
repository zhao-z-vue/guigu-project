// mock/user.js
export default [
  {
    url: '/api/user/login',
    method: 'post',
    response: ({ body }) => {
      const { username, password } = body
      if (username === 'admin' && password === '123456') {
        return {
          code: 200,
          data: {
            token: 'Admin_Token_123456'
          }
        }
      } else {
        return {
          code: 401,
          message: '用户名或密码错误'
        }
      }
    }
  },
  {
    url: '/api/user/info',
    method: 'get',
    response: (request) => {
      const token = request.headers.token
      if (token === 'Admin_Token_123456') {
        return {
          code: 200,
          data: {
            userId: 1,
            username: 'admin',
            avatar: 'https://...',
            roles: ['管理员']
          }
        }
      } else {
        return {
          code: 401,
          message: '获取用户信息失败'
        }
      }
    }
  }
]