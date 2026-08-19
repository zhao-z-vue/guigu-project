// 平台属性管理模块接口
import request from '@/utils/request'

// 接口地址统一管理
const API = {
  // 获取一级分类
  C1_URL: '/admin/product/getCategory1',
  // 获取二级分类（参数：一级分类ID）
  C2_URL: '/admin/product/getCategory2/',
  // 获取三级分类（参数：二级分类ID）
  C3_URL: '/admin/product/getCategory3/',
  // 根据三级分类ID获取属性列表
  ATTR_URL: '/admin/product/attrInfoList/',
}

// 获取一级分类数据
export const reqC1 = () => {
  return request.get(API.C1_URL)
}

// 获取二级分类数据
// category1Id: 一级分类ID
export const reqC2 = (category1Id) => {
  return request.get(`${API.C2_URL}${category1Id}`)
}

// 获取三级分类数据
// category2Id: 二级分类ID
export const reqC3 = (category2Id) => {
  return request.get(`${API.C3_URL}${category2Id}`)
}

// 根据三个分类ID获取属性列表
// （属性是挂在三级分类下的，接口需要三个分类ID）
export const reqAttr = (category1Id, category2Id, category3Id) => {
  return request.get(`${API.ATTR_URL}${category1Id}/${category2Id}/${category3Id}`)
}
