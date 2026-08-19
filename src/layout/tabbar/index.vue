<template>
  <div class="tabbar">
    <div class="t-left">
      <el-icon style="margin-right: 10px; cursor: pointer;" @click="iconChange">
        <component :is="LayoutStore.isFold ? 'Expand' : 'Fold'" />
      </el-icon>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item
          v-for="(item, index) in breadcrumbList"
          :key="index"
          :to="index < breadcrumbList.length - 1 ? item.path : undefined">
          <el-icon v-if="item.meta?.icon" style="vertical-align: middle; margin-right: 5px;">
            <component :is="item.meta.icon" />
          </el-icon>
          <span style="vertical-align: middle;">{{ item.meta?.title }}</span>
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="t-right">
      <el-button type="primary" size="small" icon="Refresh" circle @click="LayoutStore.refresh = true"></el-button>
      <el-button type="primary" size="small" icon="FullScreen" circle @click="FullScreen"></el-button>
      <el-button type="primary" size="small" icon="Setting" circle></el-button>
      <img :src="UserStore.avatar" alt="" style="width: 24px; height: 24px; margin: 0 10px;">
      <!-- 下拉菜单 -->
      <el-dropdown>
        <span class="el-dropdown-link">
          {{ UserStore.username }}
          <el-icon class="el-icon--right">
            <ArrowDown />
          </el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<style scoped lang="scss">
 .tabbar {
  width: 100%;
  height: 100%;
  font-size: 22px;
  display: flex;
  justify-content: space-between;
  background-image: linear-gradient(to right, white,black,white);
  .t-left {
    display: flex;
    align-items: center;
    margin-left: 20px;
  }
  .t-right {
    display: flex;
    align-items: center;
    margin-right: 20px;
  }
 }
</style>

<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useLayoutStore } from '@/store/modules/setting'
import { useUserStore } from '@/store/modules/user'

const route = useRoute()      // 当前路由信息（只读）：用它获取 matched、path、params、query 等
const router = useRouter()    // 路由器实例：用它进行 push、replace、back 等导航

const LayoutStore = useLayoutStore()
const UserStore = useUserStore()  

// 面包屑数据：过滤掉 title 为空的层级（如根路由 /）
const breadcrumbList = computed(() => {
  return route.matched.filter(item => item.meta?.title)
})
const iconChange = () => {
  LayoutStore.isFold = !LayoutStore.isFold
}
const FullScreen = () => {
  const full = document.fullscreenElement
  if (full) {
    document.exitFullscreen()
  } else {
    document.documentElement.requestFullscreen()
  }
}
const logout = () => {
  UserStore.logout()
  router.push({ path: '/login', query: { redirect: route.path} })  // ✅ 用 router（路由器实例）进行跳转
}
</script>
