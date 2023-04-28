<template>
  <div class="login">
    <el-form class="login-form" ref="loginFormRef" :model="loginForm" :rules="loginFormRules">
      <div class="title-container">
        <h3 class="title">后台管理系统</h3>
      </div>
      <el-form-item prop="username">
        <el-input
          v-model="loginForm.username"
          placeholder="请输入用户名"
        >
        </el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          v-model="loginForm.password"
          placeholder="请输入密码"
          type="password"
        >
        </el-input>
      </el-form-item>
      <el-button type="primary" round @click="handleLogin">登录</el-button>
    </el-form>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import useLogin from '@/store/login'
const router = useRouter()
const loginStore = useLogin()

const loginFormRef = ref(null)
const loginForm = reactive({
  username: '',
  password: ''
})
const loginFormRules = {
  username: [
    { required: true, message: '请输入用户名',  trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码',  trigger: 'blur' },
    { pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/, message: '密码长度至少6位且包含字母和数字', trigger: 'blur' }
  ]
}
// 点击登录
const handleLogin = () => {
  loginFormRef.value.validate(valid => {
    if (!valid) {
      return
    }
    loginStore.handleLogin(router)
  })
}

</script>

<style lang="less" scoped>
.login {
  width: 100%;
  height: 100%;
  background-color: #283443;
  .login-form {
    position: relative;
    width: 250px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
    .title-container {
      position: relative;

      .title {
        font-size: 26px;
        color: #eee;
        margin: 0px auto 40px auto;
        text-align: center;
        font-weight: bold;
      }
    }
    .el-button {
      width: 250px;
    }
  }
}
</style>
