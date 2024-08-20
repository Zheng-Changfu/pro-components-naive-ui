# 卡片 ProCard
<!--single-column-->

我们对 `NCard` 组件进行了封装，UI 一般很喜欢在 Header 旁边弄一个带颜色的竖条，所以我们默认加了个竖条，
加了一个展开收起，表单页、详情页用的还挺多的！当然了，你还是可以把它当成 `NCard` 组件去使用

## 演示

```demo
basic.vue
theme.vue
manual.vue
trigger-area.vue
switcher.vue
```

## API

### ProCard 属性
| 名称 | 类型 | 默认值 | 说明 | 版本 |
| --- | --- | --- | --- | --- |
| tooltip | `string \| string[]` | | 提示文字，显示在 title 的右边 | |
| prefix | `boolean` | true | 在字首显示带颜色的竖条 | |
| triggerAreas | `Array<'main'\|'arrow'>` | ['main','arrow'] | 触发展开的区域，如果不想让某些区域触发展开，可以使用此属性 | |
| showSwitcher | `boolean` | | 是否显示展开收起，如果外界没有传递此参数，除了在 closable 为 true 的情况下不显示，其他情况都显示 | |
| [...NCardProps](https://www.naiveui.com/zh-CN/os-theme/components/card#Card-Props) | | | | |

### ProCard 插槽
| 名称 | 参数 | 说明 | 版本 |
| - | - | - | - |
| switcher | `(opts:{ expanded: boolean })` | 自定义展开收起 | |
| [...NCardSlots](https://www.naiveui.com/zh-CN/os-theme/components/card#Card-Slots) | | | |
