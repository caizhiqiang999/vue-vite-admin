const routeList = [
  {
    name: 'dashboard',
    component: () => import('@/views/dashboard/index.vue')
  },
  {
    name: 'liveCourse',
    component: () => import('@/views/liveCourse/index.vue')
  },
  {
    name: 'user',
    component: () => import('@/views/system/user/index.vue')
  },
  {
    name: 'menu',
    component: () => import('@/views/system/menu/index.vue')
  },
  {
    name: 'projectLib',
    component: () => import('@/views/projectLib/index.vue')
  }
]

export function setComponent(item) {
  if (item.children.length === 0) {
    // 找到对应的路由项
    const routeItem = routeList.find(route => route.name === item.name);
    // 将路由项的component赋值给当前项
    item.component = routeItem.component;
  } else {
    // 继续递归处理子项
    item.children.forEach(child => setComponent(child));
  }
}
