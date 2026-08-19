<template>
  <div class="layout-logo">
    <img :src="setting.logo" alt="">
    <span>{{ setting.title }}</span>
  </div>
</template>

<style scoped lang="scss">
 .layout-logo {
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  color: #fff;
  padding-left: 20px;
  overflow: hidden;
  img {
    width: 40px;
    height: 40px;
    flex-shrink: 0;
  }
  span {
    font-size: 20px;
    margin-left: 10px;
    white-space: nowrap;
  }
 }
</style>

<script setup>
import setting from '@/setting';
</script>
