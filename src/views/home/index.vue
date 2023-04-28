<template>
  <div class="common-layout">
    <el-container>
      <el-aside>
        <tabbar :routes-config="loginStore.routesConfig" :is-collapse="isCollapse" />
      </el-aside>
      <el-container>
        <el-header>
          <el-icon v-if="!isCollapse" size="24" @click="iconClick"><Fold /></el-icon>
          <el-icon v-else size="24" @click="iconClick"><Expand /></el-icon>
        </el-header>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import tabbar from '@/components/tabbar/index.vue'
import useLogin from '@/store/login'
const loginStore = useLogin()

const isCollapse = ref(false)
const iconClick = () => {
  isCollapse.value = !isCollapse.value
}
</script>

<style lang="less" scoped>
.el-aside {
  width: auto;
}
.el-header {
  position: relative;
  background-color: #fff;
  .el-icon {
    cursor: pointer;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
  }
}
</style>
