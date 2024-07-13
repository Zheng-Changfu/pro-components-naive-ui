# 树 ProTree
<n-flex vertical>
  <n-alert type="success" title="提示" show-icon :bordered="false">
    增加请求加载<br />
    增加一些额外的属性控制节点状态<br />
    增加懒加载<br />
    增加一些方法，可以更方便的操作<br />
    没有破坏性变更，你可以把它当成 NTree<br />
  </n-alert>

  <n-alert type="warning" title="警告" show-icon :bordered="false">
     default-expand-all 无效，使用 setExpandedKeys 代替<br />
     default-checked-keys 无效，使用 v-model:checked-keys 或 setCheckedKeys 代替<br />
     default-expanded-keys 无效，使用 v-model:expanded-keys 或 setExpandedKeys 代替<br />
     default-selected-keys 无效，使用 v-model:selected-keys 或 setSelectedKeys 代替<br />
  </n-alert>
</n-flex>

## 演示

```demo
fetch-data.vue
lazy-fetch-data.vue
action.vue
```

## API

### ProTree 新增 Props

| 名称 | 类型 | 默认值 | 说明 | 版本 |
| --- | --- | --- | --- | --- |
| leafField | `string` | `isLeaf` | 替代 TreeOption 中的 isLeaf 字段 |  |
| remote | `boolean` | `false` | 是否为异步加载，搭配 fetchConfig 使用 |  |
| filterEmptyChildrenField | `boolean` | `true` | 是否过滤掉空子节点字段（空数组或者 undefined/null） |  |
| expandAllOnFetchSuccess | `boolean` | `false` | 请求成功后是否展开全部节点（搭配 fetchConfig） |  |
| spinProps | `SpinProps` | `{}` | Spin 组件属性 |  |
| fetchConfig | `UseRequestOptions<any, any>` | `{}` | $$$zcf$$ |  |

### ProTree 新增 Methods
使用 `ref` 或者 `useProTree` 可以拿到组件方法

| 名称 | 类型 | 说明 | 版本 |
| --- | --- | --- | --- |
| getTreeData | `() => void` | 获取数据 |  |
| setTreeData | `() => void` | 设置数据 |  |
| getFullKeys | `() => Array<string \| number>` | 获取全部节点的 keys | |
| getCheckedKeys | `() => Array<string \| number>` | 获取勾选的节点 keys | |
| getSelectedKeys | `() => Array<string \| number>` | 获取选中的节点 keys | |
| getExpandedKeys | `() => Array<string \| number>` | 获取展开的节点 keys | |
| getIndeterminateKeys | `() => Array<string \| number>` | 获取部分选中选项的 keys | |
| getEnabledKeys | `() => Array<string \| number>` | 获取 `disabled` 为 false 并且 `checkboxDisabled` 为 false 的 keys | |
| getLevelKeys | `(level: number, needLtLevelKey?: boolean) => Array<string \| number>` | 获取指定层级的 keys，`level` 从1开始，`needLtLevelKey` 代表是否需要小于指定层级的 keys，默认值 true | |
| setCheckedKeys | `(keys?: Array<string \| number>) => void` | 勾选节点，不传参数勾选所有 | |
| setExpandedKeys | `(keys?: Array<string \| number>) => void` | 展开节点，不传参数展开全部 | |
| setSelectedKeys | `(keys?: Array<string \| number>) => void` | 选中节点，不传参数选中所有 | |
| setIndeterminateKeys | `(keys: Array<string \| number>) => void` | 设置部分选中 keys | |
| getFetchControls | `() => UseRequestReturned<any, any>` | $$$zcf$$ | |
