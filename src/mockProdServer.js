// 生产环境 Mock 服务器
// 用 mockjs 拦截 XHR 请求，实现生产环境的 mock 数据
// 注意：此文件必须放在 src/ 目录下，不能放在 mock/ 目录下
// 因为 vite-plugin-mock v3 会加载 mock/ 下的所有 .js 文件作为 mock 规则
// 此文件导出的是函数不是数组，会导致 vite-plugin-mock 加载失败清空所有 mock 规则
import Mock from 'mockjs'
import userMock from '../mock/user'
import trademarkMock from '../mock/trademark'
import productAttrMock from '../mock/productAttr'

// 合并所有 mock 数据
const allMocks = [
  ...userMock,
  ...trademarkMock,
  ...productAttrMock,
]

// ====== 重写 Mock.XHR，把请求头注入到回调 options 里 ======
Mock.XHR.prototype.__send = Mock.XHR.prototype.send
Mock.XHR.prototype.send = function () {
  if (this.custom.xhr) {
    this.custom.xhr.withCredentials = this.withCredentials || false
  }
  if (this.custom.requestHeaders) {
    const headers = {}
    for (let k in this.custom.requestHeaders) {
      headers[k.toString().toLowerCase()] = this.custom.requestHeaders[k]
    }
    this.custom.options = Object.assign({}, this.custom.options, { headers })
  }
  this.__send.apply(this, arguments)
}

// 把带路径参数的 URL 转成正则
function urlToRegex(url) {
  const escaped = url.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  const withParams = escaped.replace(/\\:(\w+)/g, '(?<$1>[^/?]+)')
  return new RegExp('^' + withParams)
}

// 解析 query string
function parseQuery(url) {
  const query = {}
  const queryString = url.split('?')[1]
  if (queryString) {
    queryString.split('&').forEach((pair) => {
      const [k, v] = pair.split('=')
      query[k] = decodeURIComponent(v || '')
    })
  }
  return query
}

// 启动生产环境 mock
export function setupProdMockServer() {
  for (const item of allMocks) {
    const regex = urlToRegex(item.url)
    Mock.mock(regex, item.method || 'get', (options) => {
      const { body, url: requestUrl, headers } = options

      // 解析请求体
      let b = body
      try {
        b = JSON.parse(body)
      } catch {
        // 非 JSON 格式，保持原样
      }

      // 解析 query 参数
      const query = parseQuery(requestUrl)

      // 解析路径参数（从正则命名捕获组）
      const match = requestUrl.match(regex)
      if (match && match.groups) {
        Object.assign(query, match.groups)
      }

      // 调用 response 函数
      let result
      if (typeof item.response === 'function') {
        result = item.response.call({}, { body: b, query, headers: headers || {} })
      } else {
        result = item.response
      }

      return Mock.mock(result)
    })
  }
}
