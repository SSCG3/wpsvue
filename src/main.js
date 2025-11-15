import './assets/main.css'
import './styles/common.scss'

import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

import App from './App.vue'
import router from './router'
import store from './store'

// 导入 ribbon（供WPS调用）
import ribbon from './components/ribbon.js'
window.ribbon = ribbon

// 创建应用实例
const app = createApp(App)

// 注册 Element Plus 所有图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

// 使用插件
app.use(router)
app.use(store)
app.use(ElementPlus, {
  locale: zhCn,
  size: 'default',
  zIndex: 3000
})

// 全局错误处理（可选）
app.config.errorHandler = (err, instance, info) => {
  console.error('全局错误:', err, info)
}

// 挂载应用
app.mount('#app')

// 暴露app实例供调试使用（可选）
if (import.meta.env.DEV) {
  window.__VUE_APP__ = app
}
