export const zhDocRoutes = [
  {
    path: 'introduction',
    component: () => import('../pages/docs/introduction/zhCN/index.md'),
  },
]

export const zhComponentRoutes = [
  {
    path: 'card',
    component: () => import('../../packages/components/src/card/demos/zhCN/index.demo-entry.md'),
  },
  {
    path: 'plain',
    component: () => import('../../packages/components/src/plains/demos/zhCN/index.demo-entry.md'),
  },
  {
    path: 'config-provider',
    component: () => import('../../packages/components/src/config-provider/demos/zhCN/index.demo-entry.md'),
  },
  {
    path: 'modal',
    component: () => import('../../packages/components/src/modal/demos/zhCN/index.demo-entry.md'),
  },
  {
    path: 'form',
    component: () => import('../../packages/components/src/form/demos/zhCN/index.demo-entry.md'),
  },
  {
    path: 'field',
    component: () => import('../../packages/components/src/form/components/demos/zhCN/index.demo-entry.md'),
  },
  {
    path: 'form-list',
    component: () => import('../../packages/components/src/form-list/demos/zhCN/index.demo-entry.md'),
  },
  {
    path: 'modal-form',
    component: () => import('../../packages/components/src/modal-form/demos/zhCN/index.demo-entry.md'),
  },
  {
    path: 'drawer-form',
    component: () => import('../../packages/components/src/drawer-form/demos/zhCN/index.demo-entry.md'),
  },
  {
    path: 'search-form',
    component: () => import('../../packages/components/src/search-form/demos/zhCN/index.demo-entry.md'),
  },
  {
    path: 'data-table',
    component: () => import('../../packages/components/src/data-table/demos/zhCN/index.demo-entry.md'),
  },
  {
    path: 'edit-data-table',
    component: () => import('../../packages/components/src/edit-data-table/demos/zhCN/index.demo-entry.md'),
  },
  {
    path: 'use-request/index',
    component: () => import('../../packages/components/src/composables/demos/zhCN/index/index.demo-entry.md'),
  },
  {
    path: 'use-request/basic',
    component: () => import('../../packages/components/src/composables/demos/zhCN/basic/index.demo-entry.md'),
  },
  {
    path: 'use-request/loading-delay',
    component: () => import('../../packages/components/src/composables/demos/zhCN/loading-delay/index.demo-entry.md'),
  },
  {
    path: 'use-request/polling',
    component: () => import('../../packages/components/src/composables/demos/zhCN/polling/index.demo-entry.md'),
  },
  {
    path: 'use-request/refresh-deps',
    component: () => import('../../packages/components/src/composables/demos/zhCN/refresh-deps/index.demo-entry.md'),
  },
  {
    path: 'use-request/refresh-on-window-focus',
    component: () => import('../../packages/components/src/composables/demos/zhCN/refresh-on-window-focus/index.demo-entry.md'),
  },
  {
    path: 'use-request/debounce',
    component: () => import('../../packages/components/src/composables/demos/zhCN/debounce/index.demo-entry.md'),
  },
  {
    path: 'use-request/throttle',
    component: () => import('../../packages/components/src/composables/demos/zhCN/throttle/index.demo-entry.md'),
  },
  {
    path: 'use-request/retry',
    component: () => import('../../packages/components/src/composables/demos/zhCN/retry/index.demo-entry.md'),
  },
  {
    path: 'use-request/api',
    component: () => import('../../packages/components/src/composables/demos/zhCN/api/index.demo-entry.md'),
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
