<template>
  <div class="login-container">
    <el-row>
      <el-col :span="12" :xs="0"></el-col>
      <el-col :span="12" :xs="24">
        <el-form class="login-form">
          <el-form-item>
            <h1>Hello</h1>
            <h2>欢迎来到硅谷甄选</h2>
          </el-form-item>
          <el-form-item>
            <el-input :prefix-icon="User" v-model="loginForm.username"></el-input>
          </el-form-item>
          <el-form-item>
            <el-input type="password" size="default" :prefix-icon="Lock" v-model="loginForm.password" show-password></el-input>
          </el-form-item>
          <el-button class="login-btn" type="primary" size="default">登录</el-button>
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
import { reactive } from 'vue'
const loginForm = reactive({
  username: 'admin',
  password: '123456'
})
</script>
