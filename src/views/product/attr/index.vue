<template>
  <el-card class="box-card">
    <!-- 顶部：三级分类选择器 -->
    <Category @categoryChange="handleCategoryChange" />

    <!-- 添加属性按钮（只有选完三级分类才可以点） -->
    <el-button
      type="primary"
      :icon="Plus"
      :disabled="!isReady"
      style="margin-bottom: 10px"
      @click="openAddDialog"
    >
      添加属性
    </el-button>

    <!-- 属性列表表格 -->
    <el-table border :data="attrList" style="margin-bottom: 10px" v-loading="loading">
      <el-table-column label="序号" width="80px" align="center" type="index" />
      <el-table-column label="属性名称" prop="attrName" />
      <el-table-column label="属性值列表">
        <template #default="{ row }">
          <el-tag
            v-for="(val, i) in row.attrValueList"
            :key="val.id || i"
            style="margin-right: 6px"
          >
            {{ val.valueName }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="180px" align="center">
        <template #default="{ row }">
          <el-button type="primary" size="small" :icon="Edit" @click="openEditDialog(row)">修改</el-button>
          <el-button type="danger" size="small" :icon="Delete">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 未选分类时的提示 -->
    <el-empty v-if="!isReady" description="请选择一级、二级、三级分类以查看属性" />

    <!-- 添加/修改属性 弹窗 -->
    <el-dialog v-model="dialogVisible" :title="isEdit ? '修改属性' : '添加属性'" width="600px">
      <el-form :model="attrForm" style="width: 90%" label-width="100px">
        <el-form-item label="属性名称">
          <el-input v-model="attrForm.attrName" placeholder="请输入属性名称（如：颜色）" />
        </el-form-item>
        <el-form-item label="属性值列表">
          <div v-for="(val, i) in attrForm.attrValueList" :key="i" style="display: flex; margin-bottom: 8px; align-items: center">
            <el-input v-model="val.valueName" placeholder="请输入属性值（如：红色）" style="flex: 1; margin-right: 8px" />
            <el-button type="danger" :icon="Delete" circle size="small" @click="removeAttrValue(i)" />
          </div>
          <el-button type="primary" plain :icon="Plus" @click="addAttrValue">添加一行属性值</el-button>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="submitAttr">确认</el-button>
      </template>
    </el-dialog>
  </el-card>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { ElMessage } from 'element-plus'
import { Edit, Delete, Plus } from '@element-plus/icons-vue'
import { reqAttr } from '@/api/product/attr'
import { useCategoryStore } from '@/store/modules/category'

const categoryStore = useCategoryStore()

// 是否选完三级分类
const isReady = ref(false)
// 临时保存当前选中的三个分类ID（避免直接耦合到 store 的变化中）
const ids = reactive({ c1Id: '', c2Id: '', c3Id: '' })

// 属性列表数据
const attrList = ref([])
const loading = ref(false)

// 监听 Category 组件 emit 出来的分类变化
const handleCategoryChange = async (data) => {
  if (!data) {
    // 还没选完三级分类 → 清空列表
    isReady.value = false
    attrList.value = []
    return
  }
  ids.c1Id = data.c1Id
  ids.c2Id = data.c2Id
  ids.c3Id = data.c3Id
  isReady.value = true
  await fetchAttrList()
}

// 根据分类ID拉取属性列表
const fetchAttrList = async () => {
  loading.value = true
  try {
    const res = await reqAttr(ids.c1Id, ids.c2Id, ids.c3Id)
    if (res.code === 200) {
      attrList.value = res.data || []
    }
  } finally {
    loading.value = false
  }
}

/* -------------------- 添加/修改 属性弹窗（简化版） -------------------- */
const dialogVisible = ref(false)
const isEdit = ref(false)
// 默认表单结构，重置时使用
const defaultForm = () => ({
  id: '',
  attrName: '',
  attrValueList: [{ valueName: '' }],
})
const attrForm = reactive(defaultForm())

// 打开添加弹窗
const openAddDialog = () => {
  isEdit.value = false
  Object.assign(attrForm, defaultForm())
  dialogVisible.value = true
}

// 打开修改弹窗
const openEditDialog = (row) => {
  isEdit.value = true
  Object.assign(attrForm, {
    id: row.id,
    attrName: row.attrName,
    // 深拷贝属性值，避免修改时直接改动原表格数据
    attrValueList: row.attrValueList.map(v => ({ id: v.id, valueName: v.valueName })),
  })
  dialogVisible.value = true
}

// 添加一行属性值
const addAttrValue = () => {
  attrForm.attrValueList.push({ valueName: '' })
}

// 删除一行属性值
const removeAttrValue = (index) => {
  attrForm.attrValueList.splice(index, 1)
}

// 提交（简化版：只打印日志，不真的请求后端）
const submitAttr = () => {
  if (!attrForm.attrName.trim()) {
    ElMessage.warning('请输入属性名称')
    return
  }
  if (attrForm.attrValueList.every(v => !v.valueName.trim())) {
    ElMessage.warning('请至少添加一个属性值')
    return
  }
  console.log('提交属性表单：', {
    ...attrForm,
    category1Id: ids.c1Id,
    category2Id: ids.c2Id,
    category3Id: ids.c3Id,
  })
  ElMessage.success(isEdit.value ? '修改成功（模拟）' : '添加成功（模拟）')
  dialogVisible.value = false
}
</script>
