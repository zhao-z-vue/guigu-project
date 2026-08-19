<template>
  <el-card class="box-card">
    <!-- 卡片顶部添加按钮 -->
    <el-button type="primary" size="default" :icon="Plus" @click="addTrademark">
      添加品牌
    </el-button>
    <!-- 表格显示品牌数据 -->
    <el-table border :data="trademarkArr" style="margin: 10px 0">
      <!-- 表格序号列 -->
      <el-table-column  label="序号"  width="80px" align="center" type="index"  />
      <el-table-column label="品牌名称"  prop="tmName" />
      <el-table-column label="品牌logo">
        <template #default="{ row }">
          <img :src="row.logoUrl" alt="logo" style="width: 50px; height: 50px" />
        </template>
      </el-table-column>
      <el-table-column label="品牌操作">
        <template #default="{ row }">
          <el-button type="primary" size="small" :icon="Edit" @click="updateClick(row)" />
          <el-popconfirm
            title="确认删除吗？"
            @confirm="deleteClick(row.id)"
          >
            <template #reference>
              <el-button type="danger" size="small" :icon="Delete" />
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页器组件
     pagination
     v-model:current-page:设置分页器当前页码
     v-model:page-size:设置分页器每页显示条数
      -->
     <el-pagination
      @current-change="handleCurrentChange"
      @size-change="handleSizeChange"
      v-model:current-page="pageNo"
      v-model:page-size="limit"
      :page-sizes="[3, 5, 10, 20]"
      :background="true"
      layout=" prev, pager, next, jumper,->,sizes,total"
      :total="total || 100"
    />
    <!-- 对话框组件 -->
     <el-dialog v-model="dialogVisible" :title="trademarkForm.id ? '修改品牌' : '添加品牌'">
      <el-form style="width: 80%" :model="trademarkForm" :rules="rules" ref="formRef">
        <el-form-item label="品牌名称" >
          <el-input  placeholder="请输入品牌名称" v-model="trademarkForm.tmName" />
        </el-form-item>
        <el-form-item label="品牌logo" >
           <el-upload
    class="avatar-uploader"
    action="/api/admin/product/baseTrademark/upload"
    :show-file-list="false"
    :on-success="handleAvatarSuccess"
    :before-upload="beforeAvatarUpload"
  >
    <img v-if="trademarkForm.logoUrl" :src="trademarkForm.logoUrl" class="avatar" />
    <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
  </el-upload>
        </el-form-item>
      </el-form>
      <!-- 具名插槽添加按钮 -->
       <template #footer>
        <el-button type="primary" @click="submitForm">确认</el-button>
        <el-button type="primary" @click="closeForm">取消</el-button>
       </template>
     </el-dialog>
  </el-card>
</template>

<style scoped lang="scss">
.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
<style>
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}
.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}
.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>

<script setup>
import { ref, onMounted, reactive, nextTick } from 'vue'
import { reqHasTrademark, reqAddOrUpdateTrademark, reqDeleteTrademark } from '@/api/product/trademark/index.js'
import { ElMessage } from 'element-plus'
import { Edit, Delete, Plus } from '@element-plus/icons-vue'
// 当前页码
const pageNo = ref(1)
// 每页显示条数
const limit = ref(3)
const total = ref(0)
// 对话框是否显示
const dialogVisible = ref(false)
//表单实例
const formRef = ref()
// 表单数据
const trademarkForm = reactive({
  tmName: '',
  logoUrl: ''
})
// 校验品牌名称
const validatortmName = (rule, value, callback) => {
  // 自定义校验规则
  if (value.trim().length >= 2) {
    callback()
  } else {
    callback(new Error('品牌名称不能少于两位'))
  }
}
// 校验品牌Logo
const validatortmLogo = (rule, value, callback) => {
  if (value) {
    callback()
  } else {
    callback(new Error('请上传品牌Logo'))
  }
}
// 表单校验规则
const rules = {
  tmName: [
    { required: true, trigger: 'blur', validator: validatortmName }
  ],
  logoUrl: [
    { required: true, trigger: 'blur', validator: validatortmLogo }
  ]
}
// 修改品牌数据
const updateClick = (row) => {
  dialogVisible.value = true
  trademarkForm.id = row.id
  trademarkForm.tmName = row.tmName
  trademarkForm.logoUrl = row.logoUrl
  // 等表单渲染完成后清除上次的校验错误
  nextTick(() => formRef.value?.clearValidate())
}
// 关闭对话框
const closeForm = () => {
  dialogVisible.value = false
}
// 提交表单
const submitForm = async () => {
  // 校验表单
  // 调用这个方法进行全部表单校验，如果校验全部通过，再执行后续代码
  // await等待的是一个成功的Promise对象，如果不成功，后续代码就不会执行
  await formRef.value.validate()
  const res = await reqAddOrUpdateTrademark(trademarkForm)
  if (res.code === 200) {
    ElMessage.success(trademarkForm.id ? '修改成功' : '添加成功')
    closeForm()
    // 再次发请求获取全部已有品牌数据
    getTrademark()
  } else {
    ElMessage.error(trademarkForm.id ? '修改失败' : '添加失败')
  }
}
// 点击添加按钮，显示对话框
const addTrademark = () => {
  dialogVisible.value = true
  trademarkForm.id = ''
  trademarkForm.tmName = ''
  trademarkForm.logoUrl = ''
  // 等表单渲染完成后清除上次的校验错误
  nextTick(() => formRef.value?.clearValidate())
}
// 点击表格操作列，显示对话框
const handleClick = (row, $index) => {
  dialogVisible.value = true
}
// 存储已有品牌的数据
const trademarkArr = ref([])
// 获取已有品牌的接口封装为一个函数：在任何情况下获取数据，调用此函数即可
const getTrademark = async () => {
  const res = await reqHasTrademark(pageNo.value, limit.value)
  if (res.code === 200) {
    total.value = res.data.total
    trademarkArr.value = res.data.records
  }
}
// 页码变化
const handleCurrentChange = (page) => {
  pageNo.value = page
  getTrademark()
}
// 每页条数变化：重置到第1页
const handleSizeChange = (newLimit) => {
  limit.value = newLimit
  pageNo.value = 1
  getTrademark()
}
// 组件挂载时调用获取已有品牌的函数
onMounted(() => {
  getTrademark()
})
// 上传图片之前触发的钩子
const beforeAvatarUpload = (rawFile) => {
  if (rawFile.type !== 'image/jpeg') {
    ElMessage.error('Avatar picture must be JPG format!')
    return false
  } else if (rawFile.size / 1024 / 1024 > 2) {
    ElMessage.error('Avatar picture size can not exceed 2MB!')
    return false
  }
  return true
}
// 上传图片成功触发的钩子
const handleAvatarSuccess = (res, file) => {
  trademarkForm.logoUrl = res.data.url
  // 图片上传成功，清除掉对应校验错误信息
  formRef.value.clearValidate('logoUrl')
}
// 删除品牌数据
const deleteClick = async (id) => {
  const res = await reqDeleteTrademark(id)
  if (res.code === 200) {
    ElMessage.success('删除成功')
    getTrademark(trademarkArr.value.length > 1 ? pageNo.value : pageNo.value - 1)
  } else {
    ElMessage.error('删除失败')
  }
}
</script>
