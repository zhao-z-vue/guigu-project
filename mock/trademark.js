// mock/trademark.js

// 真实手机品牌名称
const brandNames = [
  '华为', '小米', '苹果', 'OPPO', 'vivo', '荣耀', '三星', '一加',
  '魅族', 'realme', 'iQOO', '红米', '努比亚', '中兴', '联想', '摩托罗拉',
  '诺基亚', '索尼', '谷歌', 'LG', '锤子', '黑鲨', '红魔', 'ROG',
  '酷派', '金立', '美图', '朵唯', '天语', '波导', 'HTC', '夏普',
  '传音', '格力', '海信'
]

// 生成品牌数据：具体品牌名 + logo 图片
function createBrandList() {
  return brandNames.map((name, i) => ({
    id: i + 1,
    tmName: name,
    logoUrl: `https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=${encodeURIComponent(name + ' smartphone brand logo minimalist flat design')}&image_size=square_hd`,
    createTime: new Date(Date.now() - i * 86400000).toISOString()
  }))
}

// 存储模拟数据（用于后续增删改）
let brandDB = createBrandList()

export default [
  // 1. 获取品牌列表（分页）
  {
    url: '/api/admin/product/baseTrademark/:page/:limit',
    method: 'get',
    response: ({ query }) => {
      // 从 URL 中解析 page 和 limit
      const page = parseInt(query.page) || 1
      const limit = parseInt(query.limit) || 10

      const start = (page - 1) * limit
      const end = start + limit
      const records = brandDB.slice(start, end)

      return {
        code: 200,
        message: '成功',
        data: {
          records: records,
          total: brandDB.length,
          size: limit,
          current: page,
          searchCount: true,
          pages: Math.ceil(brandDB.length / limit)
        }
      }
    }
  },
  // 2. 新增或修改品牌（POST / PUT）
  {
    url: '/api/admin/product/baseTrademark/save',
    method: 'post',
    response: ({ body }) => {
      const { id, tmName, logoUrl } = body
      if (id) {
        // 修改：找到对应品牌更新
        const index = brandDB.findIndex(item => item.id === id)
        if (index !== -1) {
          brandDB[index] = { ...brandDB[index], tmName, logoUrl }
        }
      } else {
        // 新增
        const newId = brandDB.length > 0 ? brandDB[brandDB.length - 1].id + 1 : 1
        brandDB.push({
          id: newId,
          tmName,
          logoUrl,
          createTime: new Date().toISOString()
        })
      }
      return {
        code: 200,
        message: '成功',
        data: null
      }
    }
  },
  // 3. 删除品牌（DELETE）
  {
    url: '/api/admin/product/baseTrademark/remove/:id',
    method: 'delete',
    response: ({ query }) => {
      const id = parseInt(query.id)
      brandDB = brandDB.filter(item => item.id !== id)
      return {
        code: 200,
        message: '成功',
        data: null
      }
    }
  }
]