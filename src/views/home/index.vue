<template>
  <div class="home">
    <!-- 欢迎横幅 -->
    <el-card class="welcome-card" shadow="never">
      <div class="welcome">
        <el-avatar :size="64" :src="userStore.avatar" class="avatar">
          {{ userStore.username?.charAt(0)?.toUpperCase() }}
        </el-avatar>
        <div class="welcome-text">
          <h2>{{ greeting }}，{{ userStore.username || '管理员' }}</h2>
          <p>{{ today }} · 欢迎使用硅谷甄选后台管理系统</p>
        </div>
      </div>
    </el-card>

    <!-- 数据概览 -->
    <el-row :gutter="16" class="stat-row">
      <el-col v-for="item in stats" :key="item.label" :xs="12" :sm="12" :md="6">
        <el-card shadow="hover" class="stat-card">
          <div class="stat-card-body">
            <el-icon class="stat-icon" :style="{ color: item.color }">
              <component :is="item.icon" />
            </el-icon>
            <div class="stat-info">
              <div class="stat-value">{{ item.value }}</div>
              <div class="stat-label">{{ item.label }}</div>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <!-- 快捷入口 -->
    <el-card class="shortcut-card" shadow="never">
      <template #header>
        <span>快捷入口</span>
      </template>
      <el-row :gutter="16">
        <el-col v-for="item in shortcuts" :key="item.path" :xs="12" :sm="8" :md="6">
          <div class="shortcut-item" @click="goTo(item.path)">
            <el-icon class="shortcut-icon" :style="{ color: item.color }">
              <component :is="item.icon" />
            </el-icon>
            <div class="shortcut-label">{{ item.label }}</div>
          </div>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useUserStore } from '@/store/modules/user'
import { Goods, Discount, Operation, ShoppingCart, Document, Grid, List, RefreshLeft } from '@element-plus/icons-vue'

const route = useRoute()
const router = useRouter()
const userStore = useUserStore()

// 拉取用户信息
onMounted(() => {
  if (!userStore.username) {
    userStore.userInfo()
  }
})

// 根据小时数给出问候语
const greeting = computed(() => {
  const h = new Date().getHours()
  if (h < 6) return '凌晨好'
  if (h < 9) return '早上好'
  if (h < 12) return '上午好'
  if (h < 14) return '中午好'
  if (h < 18) return '下午好'
  return '晚上好'
})

// 今天日期
const today = computed(() => {
  const d = new Date()
  const week = ['日', '一', '二', '三', '四', '五', '六'][d.getDay()]
  return `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日 星期${week}`
})

// 概览数据（简化版：静态数字，不真请求）
const stats = [
  { label: '品牌总数', value: 34, icon: Discount, color: '#409eff' },
  { label: '商品总数', value: 128, icon: Goods, color: '#67c23a' },
  { label: '订单总数', value: 56, icon: ShoppingCart, color: '#e6a23c' },
  { label: '待处理退款', value: 3, icon: RefreshLeft, color: '#f56c6c' },
]

// 快捷入口
const shortcuts = [
  { label: '品牌管理', path: '/product/trademark', icon: Discount, color: '#409eff' },
  { label: '平台属性', path: '/product/attr', icon: Operation, color: '#67c23a' },
  { label: '商品列表', path: '/product/list', icon: List, color: '#e6a23c' },
  { label: 'SKU 管理', path: '/product/sku', icon: Grid, color: '#f56c6c' },
  { label: '订单列表', path: '/order/list', icon: Document, color: '#909399' },
  { label: '退款管理', path: '/order/refund', icon: RefreshLeft, color: '#9c27b0' },
]

const goTo = async (path) => {
  await router.push(path)
}
</script>

<style scoped lang="scss">
.home {
  .welcome-card {
    margin-bottom: 16px;
    background: linear-gradient(135deg, #409eff 0%, #6c5ce7 100%);
    border: none;

    :deep(.el-card__body) {
      padding: 20px 24px;
    }

    .welcome {
      display: flex;
      align-items: center;
      color: #fff;

      .avatar {
        background: rgba(255, 255, 255, 0.25);
        color: #fff;
        font-size: 24px;
        margin-right: 16px;
        flex-shrink: 0;
      }

      .welcome-text {
        h2 {
          margin: 0 0 6px;
          font-size: 20px;
          font-weight: 600;
        }
        p {
          margin: 0;
          font-size: 13px;
          opacity: 0.85;
        }
      }
    }
  }

  .stat-row {
    margin-bottom: 16px;
  }

  .stat-card {
    margin-bottom: 16px;

    .stat-card-body {
      display: flex;
      align-items: center;
    }

    .stat-icon {
      font-size: 40px;
      margin-right: 14px;
    }

    .stat-info {
      .stat-value {
        font-size: 22px;
        font-weight: 600;
        color: #303133;
        line-height: 1.2;
      }
      .stat-label {
        font-size: 13px;
        color: #909399;
        margin-top: 4px;
      }
    }
  }

  .shortcut-card {
    .shortcut-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 18px 8px;
      border-radius: 6px;
      cursor: pointer;
      transition: background 0.2s;
      margin-bottom: 8px;

      &:hover {
        background: #f5f7fa;
      }

      .shortcut-icon {
        font-size: 32px;
        margin-bottom: 8px;
      }

      .shortcut-label {
        font-size: 14px;
        color: #606266;
      }
    }
  }
}
</style>
