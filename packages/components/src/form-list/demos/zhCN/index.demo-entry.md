# 结构化列表 ProFormList
<!--single-column-->

## 演示

```demo
basic.vue
minMax.vue
guard.vue
customAddAndRemoveProps.vue
creatorInitialValue.vue
linkFormList.vue
customItemRender.vue
customActionRender.vue
customContainerRender.vue
horizontalLayout.vue
listNest.vue
```

## API
### ProFormList 属性
除了是一个表单项，支持这些 [通用属性](field#通用的属性) 外，还扩展了一些属性

| 名称 | 类型 | 默认值 | 说明 | 版本 |
| --- | --- | --- | --- | --- |
| position | `top \| 'bottom'` | `'bottom'` | 添加一行按钮显示在顶部还是底部，区别是添加数据的时候是追加到尾部还是头部 | |
| min | `number` | | 最少行数，删除时如果少于该数则无法删除 | |
| max | `number` | | 最多行数，新增或复制时多于该数则无法新增或复制 | |
| onlyShowFirstItemLabel | `boolean` | `false` | 是否只显示第一行的 label | |
| creatorInitialValue | `() => Record<string,any>` | | 新增一行的默认值 | |
| creatorButtonProps | `ProButtonProps \| false` | | 新增一行按钮的属性，false 不显示 | |
| copyButtonProps | `ProButtonProps \| false` | | 复制按钮的属性，false 不显示 | |
| removeButtonProps | `ProButtonProps \| false` | | 删除按钮的属性，false 不显示 | |
| actionGuard | [ActionGuard](form-list#ActionGuard) | | 添加行和删除行的拦截器 | |
| [...通用属性](field#通用的属性) | | | | |

### ProFormList 实例方法
使用 `useProFormListInst` 可以拿到组件方法，如果想在子组件中使用，可以使用 `useInjectProFormListInst` 方法直接注入，您无需使用 `useProFormListInst` 注册

| 名称 | 类型 | 说明 | 版本 |
| --- | --- | --- | --- |
| push | `(...items: T[]) => void` | 尾部追加数据 | |
| pop | `() => void` | 弹出尾部数据 | |
| insert | `(index: number, ...items: T[]) => void` | 指定位置插入数据 | |
| remove | `(index: number) => void` | 删除指定位置数据 | |
| shift | `() => void` | 弹出第一条数据 | |
| unshift | `(...items: T[]) => void` | 头部追加数据 | |
| move | `(from: number, to: number) => void` | 移动数据 | |
| moveUp | `(index: number) => void` | 上移数据 | |
| moveDown | `(index: number) => void` | 下移数据 | |

### ProFormList 插槽
| 名称 | 参数 | 说明 | 版本 |
| --- | --- | --- | --- |
| default | `(opt:{index: number, total: number, action: ProFormListInstance})` | | |
| item | `(opt:{index: number, total: number, itemDom: VNodeChild, actionDom: VNodeChild, action: ProFormListInst})` | 自定义渲染每一行的结构，主要就是将 action 放在别的地方 | |
| action | `(opt:{index: number, total: number, actionDom: VNodeChild, action: ProFormListInst})` | 自定义渲染操作按钮 | |
| container | `(opt:{listDom: VNodeChild, creatorButtonDom: VNodeChild})` | 自定义渲染列表容器 | |

### ActionGuard
```ts
interface ActionGuard {
  /**
   * 添加行的拦截器
   * @param index 当前行索引
   * @param insertIndex 要插入的索引
   * @param total 当前列表总行数
   */
  beforeAddRow: (opt: { index: number, insertIndex: number, total: number }) => boolean | Promise<boolean>
  /**
   * 删除行的拦截器
   * @param index 当前行索引
   * @param total 当前列表总行数
   */
  beforeRemoveRow: (opt: { index: number, total: number }) => boolean | Promise<boolean>
}
```
