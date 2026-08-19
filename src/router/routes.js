import Layout from '@/layout/index.vue'

export const constantRoutes = [
  // 0. 根路径重定向到首页（访问 http://localhost:5173/ 时跳到 /home）
  {
    path: '/',
    redirect: '/home',
    meta: {
      hidden: true
    }
  },
  // 1. 登录页（独立路由，不套 Layout，hidden 不显示在菜单）
  {
    path: '/login',
    component: () => import('@/views/login/index.vue'),
    name: 'login',
    meta: {
      title: '登录',
      hidden: true
    }
  },
  // 2. 首页（一级路由，套 Layout）
  {
    path: '/home',
    component: Layout,
    redirect: '/home/index',
    meta: {
      title: '',
      hidden: false
    },
    children: [
      {
        path: '/home/index',
        component: () => import('@/views/home/index.vue'),
        name: 'home',
        meta: {
          title: '首页',
          hidden: false,
          icon: 'HomeFilled'
        }
      }
    ]
  },
  // 3. 商品管理（一级路由，套 Layout）
  // 5. 404 页面
  {
    path: '/404',
    component: () => import('@/views/404/index.vue'),
    name: '404',
    meta: {
      title: '404',
      hidden: true
    }
  },
]

export const asyncRoutes = [
  {
    path: '/product',
    component: Layout,
    name: 'product',
    redirect: '/product/list',
    meta: {
      title: '商品管理',
      hidden: false,
      icon: 'Goods'
    },
    children: [
      {
        path: '/product/list',
        component: () => import('@/product/goods/index.vue'),
        name: 'productList',
        meta: {
          title: '商品列表',
          hidden: false,
          icon: 'List'
        }
      },
      {
        path: '/product/sku',
        component: () => import('@/product/sku/index.vue'),
        name: 'productSku',
        meta: {
          title: 'SKU管理',
          hidden: false,
          icon: 'Grid'
        }
      },
      {
        path: '/product/trademark',
        component: () => import('@/product/trademark/index.vue'),
        name: 'productTrademark',
        meta: {
          title: '品牌管理',
          hidden: false,
          icon: 'Discount'
        }
      },
      {
        path: '/product/attr',
        component: () => import('@/views/product/attr/index.vue'),
        name: 'productAttr',
        meta: {
          title: '平台属性管理',
          hidden: false,
          icon: 'Operation'
        }
      }
    ]
  },
  // 4. 订单管理（一级路由，套 Layout）
  {
    path: '/order',
    component: Layout,
    name: 'order',
    redirect: '/order/list',
    meta: {
      title: '订单管理',
      hidden: false,
      icon: 'ShoppingCart'
    },
    children: [
      {
        path: '/order/list',
        component: () => import('@/order/index.vue'),
        name: 'orderList',
        meta: {
          title: '订单列表',
          hidden: false,
          icon: 'Document'
        }
      },
      {
        path: '/order/refund',
        component: () => import('@/order/refund/index.vue'),
        name: 'orderRefund',
        meta: {
          title: '退款管理',
          hidden: false,
          icon: 'RefreshLeft'
        }
      }
    ]
  },
]

export const anyRoutes = [
  // 6. 任意路由（匹配不到以上路由时重定向到 404）
  {
    path: '/:pathMatch(.*)*',
    redirect: '/404',
    name: 'notFound',
    meta: {
      title: '404 Not Found',
      hidden: true
    }
  }
]