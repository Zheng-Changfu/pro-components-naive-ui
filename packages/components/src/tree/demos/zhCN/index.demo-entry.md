# 树 ProTree
基于 [NTree](https://www.naiveui.com/zh-CN/os-theme/components/tree) 封装，增加了一些操作树的方法
## 演示

```demo
action.vue
```

## API

### ProTree 属性
请查阅 [NTreeProps](https://www.naiveui.com/zh-CN/os-theme/components/tree#Tree-Props)

### ProTree 新增 Methods
可以使用 `useProTreeInst` 获取实例上的方法

| 名称 | 类型 | 说明 | 版本 |
| --- | --- | --- | --- |
| getTreeData | `() => void` | 获取数据 |  |
| setTreeData | `() => void` | 设置数据，覆盖原数据 |  |
| getFullKeys | `() => Array<string \| number>` | 获取全部节点的 keys | |
| getCheckedKeys | `() => Array<string \| number>` | 获取勾选的节点 keys | |
| getSelectedKeys | `() => Array<string \| number>` | 获取选中的节点 keys | |
| getExpandedKeys | `() => Array<string \| number>` | 获取展开的节点 keys | |
| getIndeterminateKeys | `() => Array<string \| number>` | 获取部分选中选项的 keys | |
| getEnabledKeys | `() => Array<string \| number>` | 获取 `disabled` 为 false 并且 `checkboxDisabled` 为 false 的 keys | |
| getLevelKeys | `(level: number, getLtLevelKey?: boolean) => Array<string \| number>` | 获取指定层级的 keys，`level` 从1开始，`getLtLevelKey` 代表是否需要小于指定层级的 keys，默认值 true | |
| setCheckedKeys | `(keys?: Array<string \| number>) => void` | 勾选节点，不传参数勾选所有 | |
| setExpandedKeys | `(keys?: Array<string \| number>) => void` | 展开节点，不传参数展开全部 | |
| setSelectedKeys | `(keys?: Array<string \| number>) => void` | 选中节点，不传参数选中所有 | |
| setIndeterminateKeys | `(keys: Array<string \| number>) => void` | 设置部分选中 keys | |
| [...NTreeMethods](https://www.naiveui.com/zh-CN/os-theme/components/tree#Tree-Methods) | | | |
