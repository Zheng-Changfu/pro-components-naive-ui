// rubbish code here

import { h } from 'vue'
import { RouterLink } from 'vue-router'
import { NSpace, NTag } from 'naive-ui'

export function renderMenuLabel(option) {
  if (!('path' in option) || option.label === '--Debug') {
    return option.label
  }
  return h(
    RouterLink,
    {
      to: option.path,
    },
    { default: () => option.label },
  )
}

function renderNewTag(isZh) {
  return h(
    NTag,
    { type: 'success', size: 'small', round: true, bordered: false },
    { default: isZh ? () => '新' : () => 'New' },
  )
}

function renderItemExtra(rawItem, isZh) {
  if (!rawItem.enSuffix || !isZh) {
    return rawItem.isNew ? renderNewTag : undefined
  }
  const renderEn = () =>
    h(
      NSpace,
      { inline: true, size: 6, wrapItem: false, align: 'center' },
      { default: () => [rawItem.en, renderNewTag(isZh)] },
    )
  return rawItem.isNew ? renderEn : rawItem.en
}
function getItemExtraString(rawItem, isZh) {
  if (!rawItem.enSuffix || !isZh) {
    return ''
  }
  else {
    return rawItem.en
  }
}

function appendCounts(item) {
  if (!item.children) {
    item.count = 1
    return item
  }
  if (item.children) {
    item.children.forEach(appendCounts)
    item.count = item.children.reduce((sum, item) => sum + item.count, 0)
    if (item.type === 'group') {
      item.en += ` (${item.count})`
      item.zh += ` (${item.count})`
    }
    return item
  }
}

function createItems(lang, theme, prefix, items) {
  const isZh = lang === 'zh-CN'
  const langKey = isZh ? 'zh' : 'en'
  return items.map((rawItem) => {
    const item = {
      ...rawItem,
      key: rawItem.en,
      label: rawItem[langKey] || rawItem.en,
      extra: renderItemExtra(rawItem, isZh),
      extraString: getItemExtraString(rawItem, isZh),
      path: rawItem.path
        ? `/${lang}/${theme}${prefix}${rawItem.path}`
        : undefined,
    }
    if (rawItem.children) {
      item.children = createItems(lang, theme, prefix, rawItem.children)
    }
    return item
  })
}

export function createDocumentationMenuOptions({ lang, theme }) {
  return createItems(lang, theme, '/docs', [
    {
      en: 'Introduction',
      zh: '介绍',
      type: 'group',
      children: [
        {
          en: 'Naive UI',
          zh: 'Naive UI',
          path: '/introduction',
        },
      ],
    },
    {
      en: 'Getting Started',
      zh: '快速上手',
      type: 'group',
      children: [
        {
          en: 'Installation',
          zh: '安装',
          path: '/installation',
        },
        {
          en: 'Usage in SFC',
          zh: '在 SFC 中使用',
          path: '/usage-sfc',
        },
        {
          en: 'Using UMD',
          zh: '使用 UMD',
          path: '/umd',
        },
        {
          en: 'Configuring Fonts',
          zh: '配置字体',
          path: '/fonts',
        },
        {
          en: 'Import on Demand',
          zh: '按需引入',
          path: '/import-on-demand',
        },
        {
          en: 'Supported Platforms',
          zh: '支持的平台',
          path: '/supported-platforms',
        },
        {
          en: 'Common Issues',
          zh: '常见问题',
          path: '/common-issues',
        },
        {
          en: 'Controlled & Uncontrolled',
          zh: '受控与非受控',
          path: '/controlled-uncontrolled',
        },
      ],
    },
    {
      en: 'Guides',
      zh: '指南',
      type: 'group',
      children: [
        {
          en: 'JSX & TSX',
          zh: 'JSX & TSX',
          path: '/jsx',
        },
        {
          en: 'Server-Sider Rendering',
          zh: '服务端渲染 SSR',
          path: '/ssr',
        },
        {
          en: 'Customizing Theme',
          zh: '调整主题',
          path: '/customize-theme',
        },
        {
          en: 'Internationalization',
          zh: '国际化',
          path: '/i18n',
        },
        {
          en: 'Create Themed Component',
          zh: '创建适配主题的组件',
          path: '/theme',
        },
        {
          en: 'Potential Style Conflict',
          zh: '潜在的样式冲突',
          path: '/style-conflict',
        },
        {
          en: 'Third-Party Libraries',
          zh: '社区精选资源',
          path: '/community',
        },
      ],
    },
    {
      en: 'Version',
      zh: '版本',
      type: 'group',
      children: [
        {
          en: 'Change Log',
          zh: '变更日志',
          path: '/changelog',
        },
      ],
    },
  ])
}

export function createComponentMenuOptions({ lang, theme }) {
  return createItems(lang, theme, '/components', [
    appendCounts({
      zh: '架构设计',
      en: 'Framework Design',
      type: 'group',
      children: [
        {
          en: 'CommonConfiguration',
          zh: '通用配置',
          enSuffix: true,
          path: '/common-configuration',
        },
      ],
    }),
    appendCounts({
      zh: '通用组件',
      en: 'Common Components',
      type: 'group',
      children: [
        {
          en: 'ProButton',
          zh: '按钮',
          enSuffix: true,
          path: '/button',
        },
      ],
    }),
    appendCounts({
      zh: '数据录入组件',
      en: 'Data Input Components',
      type: 'group',
      children: [
        {
          en: 'ProTreeSelect',
          zh: '树型选择',
          enSuffix: true,
          path: '/tree-select',
        },
      ],
    }),
    appendCounts({
      zh: '数据展示组件',
      en: 'Data Display Components',
      type: 'group',
      children: [
        {
          en: 'ProTree',
          zh: '树',
          enSuffix: true,
          path: '/tree',
        },
      ],
    }),
    appendCounts({
      zh: '导航组件',
      en: 'Navigation Components',
      type: 'group',
      children: [

      ],
    }),
    appendCounts({
      zh: '反馈组件',
      en: 'Feedback Components',
      type: 'group',
      children: [],
    }),
    appendCounts({
      zh: '布局组件',
      en: 'Layout Components',
      type: 'group',
      children: [],
    }),
    appendCounts({
      zh: '工具组件',
      en: 'Utility Components',
      type: 'group',
      children: [

      ],
    }),
    appendCounts({
      zh: '配置组件',
      en: 'Config Components',
      type: 'group',
      children: [
        {
          en: 'ProConfigProvider',
          zh: '全局化配置',
          enSuffix: true,
          path: '/config-provider',
        },
      ],
    }),

  ])
}
