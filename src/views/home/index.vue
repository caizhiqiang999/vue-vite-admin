<template>
  <div class="common-layout">
    <el-container>
      <el-aside>
        <tabbar :routes-config="loginStore.routesConfig" :is-collapse="isCollapse" />
      </el-aside>
      <el-container>
        <el-header>
          <div class="icon">
            <el-icon v-if="!isCollapse" size="24" @click="iconClick"><Fold /></el-icon>
            <el-icon v-else size="24" @click="iconClick"><Expand /></el-icon>
          </div>
          <el-breadcrumb separator="/">
            <transition-group name="breadcrumb">
              <el-breadcrumb-item v-for="item in breadcrumbTitle" :key="item">{{ item }}</el-breadcrumb-item>
            </transition-group>
          </el-breadcrumb>
        </el-header>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import tabbar from '@/components/tabbar/index.vue'
import { getTitleByPath } from '@/utils/breadcrumb'
import { useRoute } from 'vue-router'
const route = useRoute()
import useLogin from '@/store/login'
const loginStore = useLogin()

// 菜单的展开和折叠
const isCollapse = ref(false)
const iconClick = () => {
  isCollapse.value = !isCollapse.value
}

// 获取面包屑数据并展示
const breadcrumbTitle = computed(() => {
  const routesConfig = loginStore.routesConfig
  const activePath = route.path
  return getTitleByPath(routesConfig, activePath)
})
</script>

<style lang="less" scoped>
.el-aside {
  width: auto;
}
.el-header {
  display: flex;
  background-color: #fff;
  .icon {
    height: 100%;
    width: 50px;
    position: relative;
    .el-icon {
      cursor: pointer;
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
    }
  }
  .el-breadcrumb {
    display: inline-block;
    line-height: 60px;
  }
  .breadcrumb-enter-active,
  .breadcrumb-leave-active {
    transition: all 0.5s;
  }

  .breadcrumb-enter,
  .breadcrumb-enter-active,
  .breadcrumb-leave,
  .breadcrumb-leave-active {
    opacity: 0;
    transform: translateX(100px);
  }
}
</style>
