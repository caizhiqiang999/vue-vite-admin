import { defineStore } from 'pinia'

const useLogin = defineStore('login', {
  state: () => ({
    routesConfig: [
      {
        title: '首页',
        icon: 'HomeFilled',
        name: 'dashboard',
        path: '/home/dashboard',
        component: () => import('@/views/dashboard/index.vue'),
        children: []
      },
      {
        title: '直播课程',
        icon: 'VideoCameraFilled',
        name: 'liveCourse',
        path: '/home/liveCourse',
        component: () => import('@/views/liveCourse/index.vue'),
        children: []
      },
      {
        title: '系统管理',
        icon: 'Tools',
        name: 'system',
        path: '/home/system',
        children: [
          {
            title: '用户管理',
            icon: 'UserFilled',
            name: 'user',
            path: '/home/system/user',
            component: () => import('@/views/system/user/index.vue'),
            children: []
          },
          {
            title: '菜单管理',
            icon: 'Menu',
            name: 'menu',
            path: '/home/system/menu',
            component: () => import('@/views/system/menu/index.vue'),
            children: []
          }
        ]
      },
      {
        title: '工程项目库',
        icon: 'Share',
        name: 'projectLib',
        path: '/home/projectLib',
        component: () => import('@/views/projectLib/index.vue'),
        children: []
      }
    ]
  }),
  actions: {
    // 登录逻辑
    handleLogin(router) {
      // 1.发送网络请求，拿到token和路由信息
      // 2.将token保存到本地存储中
      localStorage.setItem('token', 'token')
      // 3.动态添加路由，并在本地存储一份
      this.routesConfig.forEach((route) => {
        router.addRoute('home', route)
      })
      localStorage.setItem('routesConfig', JSON.stringify(this.routesConfig))
      // 4.跳转路由
      router.push('/home')
    }
  }
})

export default useLogin
