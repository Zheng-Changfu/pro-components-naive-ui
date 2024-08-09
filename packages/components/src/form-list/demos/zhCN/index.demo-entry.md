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
asyncFormList.vue
```

## API
### ProFormList 新增 Props
<div class='inline-flex leading-5 text-sky-600 text-xs font-500  mb-16px px-3 py-1 bg-sky-400/10 rounded-full'>除了是一个表单控件，可以接受所有的表单控件属性外，还扩展了一些属性</div>

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
| itemRender | [ItemRender](form-list#ItemRender) | | 自定义渲染每一行的结构，主要就是将 action 放在别的地方 | |
| actionRender | [ActionRender](form-list#ActionRender) | | 自定义渲染操作按钮 | |
| fieldRender | [ArrayFieldRender](form-list#ArrayFieldRender) | | 自定义渲染控件，可以用来包裹额外的 dom 结构 | |

### ProFormList Methods
<div class='inline-flex leading-5 text-sky-600 text-xs font-500  mb-16px px-3 py-1 bg-sky-400/10 rounded-full'>使用 ref 或者 useProFormListInstance 可以拿到组件方法，子组件中可以使用 useInjectProFormListInstance 方法直接注入</div>

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

### ProFormList Slots
| 名称 | 参数 | 说明 | 版本 |
| --- | --- | --- | --- |
| default | `(opt:{index:number, total:number, action:ProFormListInstance})` | | |

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

### ItemRender
```ts
/**
 * 自定义渲染每一行的结构，主要就是将 action 放在别的地方
 * @param index 当前行索引
 * @param total 当前列表总行数
 * @param itemVNode 当前行(不包括 action 区域)的虚拟节点
 * @param actionVNode 当前行(action 区域)的虚拟节点
 * @param action 表单列表实例，上面有很多方法
 */
type ItemRender = (opt: {
  index: number
  total: number
  itemVNode: VNodeChild
  actionVNode: VNodeChild
  action: ProFormListInstance
}) => VNodeChild
```

### ActionRender
```ts
/**
 * 自定义渲染操作按钮
 * @param index 当前行索引
 * @param total 当前列表总行数
 * @param actionVNode 当前行(action 区域)的虚拟节点
 * @param action 表单列表实例，上面有很多方法
 */
type ActionRender = (opt: {
  index: number
  total: number
  actionVNode: VNodeChild
  action: ProFormListInstance
}) => VNodeChild
```

### ArrayFieldRender
```ts
/**
 * 自定义渲染控件，可以包裹一些额外的 dom 结构
 * @param listVNode 列表的虚拟节点
 * @param fieldVNode 列表 + 添加一行数据的虚拟节点
 * @param creatorButtonVNode 添加一行数据的虚拟节点
 */
type ArrayFieldRender = (opt: {
  listVNode: VNodeChild
  fieldVNode: VNodeChild
  creatorButtonVNode: VNodeChild
}) => VNodeChild
```
