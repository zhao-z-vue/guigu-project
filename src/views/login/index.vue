<template>
  <div class="login-container">
    <el-row>
      <el-col :span="12" :xs="0"></el-col>
      <el-col :span="12" :xs="24">
        <el-form class="login-form" :model="loginForm" :rules="rules" ref="loginFormRef">
          <el-form-item>
            <h1>Hello</h1>
            <h2>欢迎来到硅谷甄选</h2>
          </el-form-item>
          <el-form-item prop="username">
            <el-input :prefix-icon="User" v-model="loginForm.username"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input type="password" size="default" :prefix-icon="Lock" v-model="loginForm.password" show-password></el-input>
          </el-form-item>
          <el-button :loading="loading" class="login-btn" type="primary" size="default" @click="login">登录</el-button>
        </el-form>
      </el-col>
    </el-row>
  </div>  
</template>

<style scoped lang="scss">
.login-container {
  width: 100%;
  height: 100vh;
  background-image: url('@/assets/images/background.png') ;
  background-size: cover;
  .login-form {
    position: relative;
    width: 80%;
    top: 30vh;
    h1 {
      font-size: 40px;
      color: white;
      width: 100%;
    }
    h2 {
      font-size: 20px;
      color: white;
      margin-top: 20px;
      width: 100%;
    }
    .login-btn {
      width: 100%;
    }
  }
}

</style>

<script setup>
import { User, Lock } from '@element-plus/icons-vue'
import { reactive, ref } from 'vue'
import { useUserStore } from '@/store/modules/user'
import { useRouter } from 'vue-router'
import {ElNotification} from 'element-plus'
import { getTime } from '@/utils/time'
import { ElMessage } from 'element-plus'
const loginFormRef = ref(null)
const router = useRouter()
const loading = ref(false)
const userStore = useUserStore()
const loginForm = reactive({
  username: 'admin',
  password: '123456'
})
// 自定义校验规则
const validateUsername = (rule, value, callback) => {
  if (value.length <= 5) {
    callback()
  } else {
    callback(new Error('用户名长度不能大于5位'))
  }
}
const validatePassword = (rule, value, callback) => {
  if (value.length < 6) {
    callback(new Error('密码长度不能小于6位'))
  } else {
    callback()
  }
}
const login = async () => {
  // 保证全部表单通过校验再发请求
  await loginFormRef.value.validate()
  // 通知仓库发登录请求
  try {
    loading.value = true
    await userStore.userLogin(loginForm);
    loading.value = false
    ElNotification({
      title: `Hi ${getTime()}`,
      message: '欢迎来到硅谷甄选',
      type: 'success'
    })
    await router.push('/home')
  } catch (error) {
    console.error('登录失败详情:', error)
    loading.value = false
    ElNotification({
      title: '登录失败',
      message: error.message,
      type: 'error'
    })
  }
}
const rules = reactive({
  username: [{
    required: true, trigger: 'change', validator: validateUsername
  }],
  password: [{
    required: true, trigger: 'change', validator: validatePassword
  }]
})
</script>
