<template>
  <div class="tabbar">
    <el-menu :default-active="$route.path" :collapse="isCollapse" router @select="menuChange">
      <div ref="titleRef" class="title">
        <img class="logo" src="@/assets/image/tabbar/logo.svg" alt="" />
        <h3 v-show="!isCollapse" class="title-name">后台管理系统</h3>
      </div>
      <template v-for="item in routesConfig">
        <template v-if="item.children && item.children.length > 0">
          <el-sub-menu :key="item.path" :index="item.path">
            <template #title>
              <el-icon>
                <component :is="item.icon"></component>
              </el-icon>
              <span>{{ item.title }}</span>
            </template>
            <nav-menu :routes-config="item.children"></nav-menu>
          </el-sub-menu>
        </template>
        <template v-else>
          <el-menu-item :key="item.path" :index="item.path">
            <el-icon>
              <component :is="item.icon"></component>
            </el-icon>
            <span>{{ item.title }}</span>
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>
</template>

<script setup>
import navMenu from './nav-menu/index.vue'

defineProps({
  routesConfig: {
    type: Array,
    default: () => {
      return []
    }
  },
  isCollapse: {
    type: Boolean,
    default: false
  }
})
const emit = defineEmits(['menuChange'])

const menuChange = (path) => {
  emit('menuChange', path)
}
</script>

<style lang="less" scoped>
.tabbar {
  height: 100vh;
  .el-menu {
    height: 100%;
    border: none;
    color: #bfcbd9;
    background-color: #304156;
    :deep(.el-menu-item.is-active) {
      color: #1179ff;
      background-color: #1f2d3d;
    }
    :deep(.el-menu-item),
    :deep(.el-sub-menu__title) {
      color: #bfcbd9;
      background-color: #304156;
      &:hover {
        background-color: #263445;
      }
    }
    .title {
      width: 100%;
      height: 50px;
      display: flex;
      justify-content: center;
      align-items: center;
      white-space: nowrap;
      overflow: hidden;
      .logo {
        width: 30px;
        height: auto;
        vertical-align: middle;
      }
      .title-name {
        margin-left: 10px;
      }
    }
  }
  .el-menu:not(.el-menu--collapse) {
    width: 200px;
  }
}
</style>
