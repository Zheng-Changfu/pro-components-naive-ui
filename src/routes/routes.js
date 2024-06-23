export const zhDocRoutes = [
  {
    path: 'introduction',
    component: () => import('../pages/docs/introduction/zhCN/index.md'),
  },
]

export const zhComponentRoutes = [
  {
    path: 'input',
    component: () => import('../../packages/components/src/input/demos/zhCN/index.demo-entry.md'),
  },
  {
    path: 'button',
    component: () => import('../../packages/components/src/button/demos/zhCN/index.demo-entry.md'),
  },
]

export const routes = [
  {
    name: 'home',
    path: '/:lang/:theme',
    component: () => import('../pages/home/index.vue'),
  },
  {
    name: 'zhDocs',
    path: '/zh-CN/:theme/docs',
    component: () => import('../pages/Layout.vue'),
    children: zhDocRoutes,
  },
  {
    name: 'zhComponents',
    path: '/zh-CN/:theme/components',
    component: () => import('../pages/Layout.vue'),
    children: zhComponentRoutes,
  },
  {
    name: 'not-found',
    path: '/:pathMatch(.*)*',
    redirect: {
      name: 'home',
      params: {
        lang: 'zh-CN',
        theme: 'os-theme',
      },
    },
  },
]
