<template>
  <div>
    <template v-for="item in routesConfig">
      <template v-if="item.children && item.children.length > 0">
        <el-sub-menu :key="item.path" :index="item.path">
          <template #title>
            <el-icon>
              <component :is="item.icon"></component>
            </el-icon>
            <span>{{ item.title }}</span>
          </template>
          <nav-menu :routesConfig="item.children"></nav-menu>
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
  </div>
</template>

<script setup>
defineProps({
  routesConfig: {
    type: Array,
    default: () => {
      return []
    }
  }
})
</script>

<style lang="less" scoped>

</style>