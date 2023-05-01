<template>
  <div class="common-layout">
    <el-container>
      <el-aside>
        <tabbar :routes-config="loginStore.routesConfig" :is-collapse="isCollapse" @menu-change="menuChange" />
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
        <div class="nav">
          <transition-group name="fade">
            <div
              class="card"
              :class="{ 'active-card': route.path === getPathByTitle(routesConfig, item) }"
              v-for="(item, index) in navArray"
              :key="item"
              @click="navClick(item)"
            >
              <span>{{ item }}</span>
              <el-icon v-if="index !== 0" @click.stop="deleteNav(index)"><Close /></el-icon>
            </div>
          </transition-group>
        </div>
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
import { getBreadcrumbDataByPath } from '@/utils/breadcrumb'
import { getNavByPath, getPathByTitle } from '@/utils/nav'
import { useRoute, useRouter } from 'vue-router'
const route = useRoute()
const router = useRouter()
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
  return getBreadcrumbDataByPath(routesConfig, activePath)
})

// 获取nav数据
const activePath = route.path
const routesConfig = loginStore.routesConfig
const activeTitle = getNavByPath(routesConfig, activePath)
const navArray = ref([activeTitle])
const menuChange = (path) => {
  const title = getNavByPath(routesConfig, path)
  if (!navArray.value.includes(title)) {
    navArray.value.push(title)
  }
}
// 点击nav进行路由跳转
const navClick = (title) => {
  const path = getPathByTitle(routesConfig, title)
  if (path !== route.path) {
    router.push(path)
  }
}
// 删除nav
const deleteNav = (index) => {
  const activePath = getPathByTitle(routesConfig, navArray.value[index])
  // 如果当前路由正好是删除的路由
  if (route.path === activePath) {
    const path = getPathByTitle(routesConfig, navArray.value[index - 1])
    router.push(path)
  }
  navArray.value.splice(index, 1)
}
</script>

<style lang="less" scoped>
.el-aside {
  width: auto;
}
.el-header {
  display: flex;
  height: 50px;
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
    line-height: 50px;
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
.nav {
  height: 25px;
  width: 100%;
  box-sizing: border-box;
  padding: 0 20px;
  background-color: #fff;
  border-bottom: 1px solid var(--el-border-color);
  display: flex;
  .card {
    padding: 0 10px;
    margin-right: 5px;
    height: 100%;
    font-size: 14px;
    color: #606266;
    line-height: 25px;
    box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.12);
    .el-icon {
      position: relative;
      top: 2px;
      left: 4px;
      cursor: pointer;
    }
  }
  .active-card {
    background-color: #67c23a;
    color: #edebeb;
  }
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.28s;
  }

  .fade-enter,
  .fade-leave-active {
    opacity: 0;
  }

  /* fade-transform */
  .fade-transform-leave-active,
  .fade-transform-enter-active {
    transition: all 0.5s;
  }

  .fade-transform-enter {
    opacity: 0;
    transform: translateX(-30px);
  }

  .fade-transform-leave-to {
    opacity: 0;
    transform: translateX(30px);
  }
}
</style>
