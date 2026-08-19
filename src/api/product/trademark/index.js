// 品牌管理模块接口
import request from '@/utils/request'

// 接口地址统一管理
const API = {
  // 获取品牌列表（分页）
  TRADEMARK_URL: '/admin/product/baseTrademark/',
  // 添加品牌
  ADD_TRADEMARK_URL: '/admin/product/baseTrademark/save',
  // 修改品牌
  UPDATE_TRADEMARK_URL: '/admin/product/baseTrademark/update',
  // 删除品牌
  DELETE_TRADEMARK_URL: '/admin/product/baseTrademark/remove/',
}

// 获取品牌列表（分页）
// page: 页码，默认1；limit: 每页条数，默认10
export const reqHasTrademark = (page = 1, limit = 10) => {
  return request.get(`${API.TRADEMARK_URL}${page}/${limit}`)
}

// 添加或修改品牌
// data: { id?: number, tmName: string, logoUrl: string }
// 如果有id就是修改，没有id就是添加
// 统一走 POST save，mock 层会根据是否有 id 区分新增或修改
export const reqAddOrUpdateTrademark = (data) => {
  return request.post(API.ADD_TRADEMARK_URL, data)
}

// 删除品牌
// id: 品牌id
export const reqDeleteTrademark = (id) => {
  return request.delete(`${API.DELETE_TRADEMARK_URL}${id}`)
}