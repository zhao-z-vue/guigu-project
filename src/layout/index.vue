<template>
<div class="layout-container">
  <!-- 左侧导航栏 -->
  <div class="layout-slider" :default-active="$route.path" :class="{fold: LayoutStore.isFold ? true : false}">
    <Logo></Logo>
    <el-scrollbar class="layout-slider-scrollbar">
      <el-menu
        background-color="#001529"
        text-color="white"
        router
        :collapse="LayoutStore.isFold ? true : false"
        :default-active="$route.path">
        <Menu :routes="userStore.menuRoutes"></Menu>
      </el-menu>
    </el-scrollbar>
  </div>
  <!-- 顶部导航栏 -->
  <div class="layout-tabbar">
    <Tabbar></Tabbar>
  </div>
  <!-- 内容区域 -->
  <div class="layout-content">
    <router-view v-if="refresh"></router-view>
  </div>
</div>
</template>

<style scoped lang="scss">
.layout-container {
  width: 100%;
  height: 100vh;
  .layout-slider {
    height: 100%;
    width: $base_menu_width;
    background-color: $base_menu_bg_color;
    transition: width 0.3s;
    overflow: hidden;
    &.fold {
      width: 50px;
    }
    .layout-slider-scrollbar {
      height: calc(100% - 50px);
      width: 100%;
      .el-menu {
        border-right: none;
      }
    }
  }
  .layout-tabbar {
    position: fixed;
    top: 0;
    left: $base_menu_width;
    width: calc(100% - $base_menu_width);
    height: $base_header_height;
    transition: all 0.3s;
  }
  .layout-content {
    position: absolute;
    top: $base_header_height;
    left: $base_menu_width;
    width: calc(100% - $base_menu_width);
    height: calc(100% - $base_header_height);
    overflow: auto;
    transition: all 0.3s;
  }
  // 折叠状态：顶栏与内容区左移
  .layout-slider.fold ~ .layout-tabbar {
    left: 50px;
    width: calc(100% - 50px);
  }
  .layout-slider.fold ~ .layout-content {
    left: 50px;
    width: calc(100% - 50px);
  }
}
</style>

<script setup>
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useLayoutStore } from '@/store/modules/setting'
import { useUserStore } from '@/store/modules/user'
import Logo from './logo/index.vue'
import Menu from './menu/index.vue'
import Tabbar from './tabbar/index.vue'

const LayoutStore = useLayoutStore()
const userStore = useUserStore()
const router = useRouter()

// 刷新功能：通过 v-if 销毁并重建 router-view 实现页面刷新
let refresh = ref(true)
watch(() => LayoutStore.refresh, (newVal) => {
  if (newVal) {
    refresh.value = false  // 销毁 router-view（页面变空白）
    setTimeout(() => {
      refresh.value = true  // 重建 router-view（页面恢复）
      LayoutStore.refresh = false  // 重置状态，保证下次点击能再次触发
    }, 300)  // 延迟 300ms，让用户能看到"闪一下"的效果
  }
})
</script>
