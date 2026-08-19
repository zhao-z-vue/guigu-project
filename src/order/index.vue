<template>
  <div>
    <h2>{{ route.meta.title }}</h2>
    <p>当前路径：{{ route.path }}</p>
  </div>
</template>

<style scoped lang="scss">
</style>

<script setup>
import { useRoute } from 'vue-router'
const route = useRoute()
</script>
