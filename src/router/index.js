import { createRouter, createWebHashHistory } from 'vue-router'
//import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history:  createWebHashHistory(''),
  routes: [
    {
      path: '/',
      name: '默认页',
      component: () => import('../components/Root.vue')
    },
    {
      path: '/dialog',
      name: '对话框',
      component: () => import('../components/Dialog.vue')
    },
    {
      path: '/taskpane',
      name: '任务窗格',
      component: () => import('../components/TaskPane.vue')
    },
    {
      path: '/rewrite',
      name: 'AI写稿',
      component: () => import('../views/rewrite/index.vue'),
      meta: {
        title: 'AI写稿'
      }
    },
    {
      path: '/help',
      name: '帮助',
      component: () => import('../components/HelpDialog.vue'),
      meta: {
        title: '使用帮助'
      }
    },
    {
      path: '/about',
      name: '关于',
      component: () => import('../components/AboutDialog.vue'),
      meta: {
        title: '关于'
      }
    }
  ]
})

export default router
