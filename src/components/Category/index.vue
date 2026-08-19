<template>
  <div class="category-select">
    <!-- 一级分类 -->
    <el-select
      v-model="categoryStore.c1Id"
      placeholder="请选择一级分类"
      style="width: 240px; margin-right: 10px"
      @change="handleC1Change"
    >
      <el-option
        v-for="item in categoryStore.c1Arr"
        :key="item.id"
        :label="item.name"
        :value="item.id"
      />
    </el-select>

    <!-- 二级分类 -->
    <el-select
      v-model="categoryStore.c2Id"
      placeholder="请选择二级分类"
      style="width: 240px; margin-right: 10px"
      :disabled="!categoryStore.c1Id"
      @change="handleC2Change"
    >
      <el-option
        v-for="item in categoryStore.c2Arr"
        :key="item.id"
        :label="item.name"
        :value="item.id"
      />
    </el-select>

    <!-- 三级分类 -->
    <el-select
      v-model="categoryStore.c3Id"
      placeholder="请选择三级分类"
      style="width: 240px"
      :disabled="!categoryStore.c2Id"
      @change="handleC3Change"
    >
      <el-option
        v-for="item in categoryStore.c3Arr"
        :key="item.id"
        :label="item.name"
        :value="item.id"
      />
    </el-select>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useCategoryStore } from '@/store/modules/category'

// 定义 emit：选完三级分类后向父组件传递分类ID
const emit = defineEmits(['categoryChange'])

const categoryStore = useCategoryStore()

// 组件挂载时获取一级分类数据
onMounted(() => {
  categoryStore.getC1()
})

// 一级分类变化：触发获取二级
const handleC1Change = () => {
  categoryStore.getC2()
  // 一级变了，通知父组件清除已有的属性数据
  emit('categoryChange', null)
}

// 二级分类变化：触发获取三级
const handleC2Change = () => {
  categoryStore.getC3()
  emit('categoryChange', null)
}

// 三级分类变化：向父组件通知，可以去拉属性列表了
const handleC3Change = () => {
  emit('categoryChange', {
    c1Id: categoryStore.c1Id,
    c2Id: categoryStore.c2Id,
    c3Id: categoryStore.c3Id,
  })
}
</script>

<style scoped lang="scss">
.category-select {
  margin-bottom: 16px;
}
</style>
