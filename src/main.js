import { createApp } from 'vue'
import router from './router'
import pinia from './store'
import App from './App.vue'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import 'normalize.css'

const app = createApp(App)
// 全局注册navMenu组件
import componentNavMenu from './components/tabbar'
componentNavMenu(app)

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
app.use(pinia)
// 动态添加路由，防止刷新浏览器白屏
import { setComponent } from '@/utils/addRoute'
let routesConfig = JSON.parse(localStorage.getItem('routesConfig')) || []
routesConfig.forEach((item) => setComponent(item))
routesConfig.forEach((route) => {
  router.addRoute('home', route)
})

app.use(router)
app.mount('#app')
