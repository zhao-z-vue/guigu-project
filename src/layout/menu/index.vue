<template>
  <template v-for="item in filteredRoutes">
    <!-- 没有子路由 -->
    <el-menu-item
      v-if="!item.children || getFilteredChildren(item).length === 0"
      :index="item.path"
      :key="item.path">
        <el-icon>
          <component :is="item.meta.icon"></component>
        </el-icon>
      <template #title>
        <span>{{ item.meta?.title }}</span>
      </template>
    </el-menu-item>

    <!-- 有一个子路由 -->
    <el-menu-item
      v-else-if="getFilteredChildren(item).length === 1"
      :index="getFilteredChildren(item)[0].path">
        <el-icon>
          <component :is="getFilteredChildren(item)[0].meta?.icon"></component>
        </el-icon>
      <template #title>
        <span>{{ getFilteredChildren(item)[0].meta?.title }}</span>
      </template>
    </el-menu-item>

    <!-- 有多个子路由 -->
    <el-sub-menu
      v-else
      :index="item.path">
      <template #title>
        <el-icon>
          <component :is="item.meta?.icon"></component>
        </el-icon>
        <span>{{ item.meta?.title }}</span>
      </template>
      <Menu :routes="getFilteredChildren(item)"></Menu>
    </el-sub-menu>
  </template>
</template>

<style scoped lang="scss">
</style>

<script>
export default {
  name: 'Menu'
}
</script>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  routes: {
    type: Array,
    default: () => []
  }
})

// 过滤掉 hidden 为 true 的路由
const filterHidden = (routes) => {
  return routes
    .filter(r => !r.meta?.hidden)
    .map(r => ({
      ...r,
      children: r.children ? filterHidden(r.children) : []
    }))
}

// 计算属性：过滤后的路由
const filteredRoutes = computed(() => filterHidden(props.routes))

// 获取过滤后的子路由
const getFilteredChildren = (item) => {
  if (!item.children || item.children.length === 0) return []
  return filterHidden(item.children)
}
</script>
