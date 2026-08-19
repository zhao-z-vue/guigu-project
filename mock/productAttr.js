// mock/productAttr.js —— 平台属性管理 mock 数据

// ---------- 一级分类 ----------
const c1List = [
  { id: 1, name: '手机、数码、通讯' },
  { id: 2, name: '电脑、办公' },
  { id: 3, name: '家用电器' },
]

// ---------- 二级分类（按 c1Id 分组） ----------
const c2Map = {
  1: [
    { id: 11, name: '手机通讯' },
    { id: 12, name: '手机配件' },
    { id: 13, name: '智能设备' },
  ],
  2: [
    { id: 21, name: '电脑整机' },
    { id: 22, name: '电脑配件' },
    { id: 23, name: '办公设备' },
  ],
  3: [
    { id: 31, name: '电视' },
    { id: 32, name: '空调' },
    { id: 33, name: '冰箱' },
  ],
}

// ---------- 三级分类（按 c2Id 分组） ----------
const c3Map = {
  11: [
    { id: 111, name: '智能手机' },
    { id: 112, name: '老人机' },
    { id: 113, name: '对讲机' },
  ],
  12: [
    { id: 121, name: '手机壳' },
    { id: 122, name: '贴膜' },
    { id: 123, name: '充电器' },
  ],
  13: [
    { id: 131, name: '智能手表' },
    { id: 132, name: '蓝牙耳机' },
  ],
  21: [
    { id: 211, name: '笔记本' },
    { id: 212, name: '台式机' },
    { id: 213, name: '一体机' },
  ],
  22: [
    { id: 221, name: 'CPU' },
    { id: 222, name: '显卡' },
    { id: 223, name: '内存' },
  ],
  23: [
    { id: 231, name: '打印机' },
    { id: 232, name: '扫描仪' },
  ],
  31: [
    { id: 311, name: '平板电视' },
    { id: 312, name: '激光电视' },
  ],
  32: [
    { id: 321, name: '挂壁式空调' },
    { id: 322, name: '柜式空调' },
  ],
  33: [
    { id: 331, name: '双门冰箱' },
    { id: 332, name: '多门冰箱' },
  ],
}

// ---------- 属性列表（按 c3Id 分组） ----------
const attrMap = {
  111: [
    {
      id: 1001,
      attrName: '颜色',
      attrValueList: [
        { id: 10011, valueName: '黑色' },
        { id: 10012, valueName: '白色' },
        { id: 10013, valueName: '蓝色' },
        { id: 10014, valueName: '金色' },
      ],
    },
    {
      id: 1002,
      attrName: '运行内存',
      attrValueList: [
        { id: 10021, valueName: '6GB' },
        { id: 10022, valueName: '8GB' },
        { id: 10023, valueName: '12GB' },
        { id: 10024, valueName: '16GB' },
      ],
    },
    {
      id: 1003,
      attrName: '机身存储',
      attrValueList: [
        { id: 10031, valueName: '128GB' },
        { id: 10032, valueName: '256GB' },
        { id: 10033, valueName: '512GB' },
        { id: 10034, valueName: '1TB' },
      ],
    },
  ],
  112: [
    {
      id: 1101,
      attrName: '网络制式',
      attrValueList: [
        { id: 11011, valueName: '移动4G' },
        { id: 11012, valueName: '联通4G' },
        { id: 11013, valueName: '电信4G' },
      ],
    },
    {
      id: 1102,
      attrName: '待机时间',
      attrValueList: [
        { id: 11021, valueName: '3-5天' },
        { id: 11022, valueName: '7天以上' },
      ],
    },
  ],
  113: [
    {
      id: 1201,
      attrName: '通讯距离',
      attrValueList: [
        { id: 12011, valueName: '1-3公里' },
        { id: 12012, valueName: '5公里' },
        { id: 12013, valueName: '10公里' },
      ],
    },
  ],
  131: [
    {
      id: 1301,
      attrName: '表壳材质',
      attrValueList: [
        { id: 13011, valueName: '铝合金' },
        { id: 13012, valueName: '不锈钢' },
        { id: 13013, valueName: '钛金属' },
      ],
    },
    {
      id: 1302,
      attrName: '续航',
      attrValueList: [
        { id: 13021, valueName: '1天' },
        { id: 13022, valueName: '3天' },
        { id: 13023, valueName: '14天' },
      ],
    },
  ],
  211: [
    {
      id: 2101,
      attrName: '屏幕尺寸',
      attrValueList: [
        { id: 21011, valueName: '13英寸' },
        { id: 21012, valueName: '14英寸' },
        { id: 21013, valueName: '15.6英寸' },
        { id: 21014, valueName: '16英寸' },
      ],
    },
    {
      id: 2102,
      attrName: '处理器',
      attrValueList: [
        { id: 21021, valueName: 'i5' },
        { id: 21022, valueName: 'i7' },
        { id: 21023, valueName: 'i9' },
        { id: 21024, valueName: 'R7' },
      ],
    },
  ],
  221: [
    {
      id: 2201,
      attrName: '核心数',
      attrValueList: [
        { id: 22011, valueName: '4核' },
        { id: 22012, valueName: '6核' },
        { id: 22013, valueName: '8核' },
        { id: 22014, valueName: '12核' },
      ],
    },
    {
      id: 2202,
      attrName: '接口类型',
      attrValueList: [
        { id: 22021, valueName: 'LGA1700' },
        { id: 22022, valueName: 'AM5' },
      ],
    },
  ],
  311: [
    {
      id: 3101,
      attrName: '尺寸',
      attrValueList: [
        { id: 31011, valueName: '55英寸' },
        { id: 31012, valueName: '65英寸' },
        { id: 31013, valueName: '75英寸' },
        { id: 31014, valueName: '85英寸' },
      ],
    },
    {
      id: 3102,
      attrName: '分辨率',
      attrValueList: [
        { id: 31021, valueName: '4K' },
        { id: 31022, valueName: '8K' },
      ],
    },
  ],
}

// 找不到对应 c3Id 属性时给一个默认空数组
function getAttrList(c3Id) {
  return attrMap[c3Id] || []
}

export default [
  // 1. 获取一级分类
  {
    url: '/api/admin/product/getCategory1',
    method: 'get',
    response: () => ({
      code: 200,
      message: '成功',
      data: c1List,
    }),
  },
  // 2. 获取二级分类 /getCategory2/:c1Id
  {
    url: '/api/admin/product/getCategory2/:c1Id',
    method: 'get',
    response: ({ query }) => {
      const c1Id = Number(query.c1Id)
      return {
        code: 200,
        message: '成功',
        data: c2Map[c1Id] || [],
      }
    },
  },
  // 3. 获取三级分类 /getCategory3/:c2Id
  {
    url: '/api/admin/product/getCategory3/:c2Id',
    method: 'get',
    response: ({ query }) => {
      const c2Id = Number(query.c2Id)
      return {
        code: 200,
        message: '成功',
        data: c3Map[c2Id] || [],
      }
    },
  },
  // 4. 属性列表 /attrInfoList/:c1Id/:c2Id/:c3Id
  {
    url: '/api/admin/product/attrInfoList/:c1Id/:c2Id/:c3Id',
    method: 'get',
    response: ({ query }) => {
      const c3Id = Number(query.c3Id)
      return {
        code: 200,
        message: '成功',
        data: getAttrList(c3Id),
      }
    },
  },
]
