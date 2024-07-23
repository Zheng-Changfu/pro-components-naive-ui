# 异步控件
<!--single-column-->
<n-flex vertical>
    <n-alert type="success" title="提示" show-icon :bordered="false">
    支持请求获取数据源<br />
  </n-alert>
</n-flex>

## 演示

```demo
checkboxGroupBasic.vue
radioGroupBasic.vue
transferBasic.vue
selectBasic.vue
selectLazy.vue
treeSelectBasic.vue
treeSelectLazy.vue
linkAsync.vue
```

## API
### 通用 fetchConfig
说明：
  1. `fetchConfig` 中的属性都支持表达式
  2. 由于 `Vue` 目前类型的限制，没有办法在组件上做到完整的类型推断，如果想要完整的类型推断，可以使用 `useProRequest` 方法

| 名称 | 类型 | 默认值 | 说明 | 版本 |
| --- | --- | --- | --- | --- |
| initialValue | `any` | `undefined` | 初始值，请求前 `data` 的值  |  |
| immediate | `boolean` | `true` | 是否立即触发一次  |  |
| api | `(...args: any[]) => any` | | 请求函数  |  |
| transform | `(response:any) => any` | | 转换响应结果  |  |
| restoreValueOnFetched | `boolean` | `true` | 请求结束后是否还原值并清空校验，防止匹配不到结果造成显示上的错误，默认 true |
| successTip | `string \| false \| ((response: any) => string \| false)` | | 请求成功后的提示，false 则不提示，可以在全局统一配置  |  |
| failureTip | `string \| false \| ((error: any) => string \| false)` | | 请求失败后的提示，false 则不提示，可以在全局统一配置  |  |
| dependencies | `{ watch: MaybeArray<WatchSource>; guard?: MaybeRefOrGetter<boolean> }` | | 依赖项，当依赖发生变化时，触发 guard，通过拦截器后，会重新调用 api |  |
| onSuccess | `(response: any) => void` | | 请求成功后调用的回调 |  |
| onFailure | `(error: any) => void` | | 请求失败后调用的回调 |  |
| tipApi | `(type: 'success' \| 'failure', tipText: string, dataOrError: any) => void` | | 用什么形式去提示，可以在全局统一配置 |  |
| debounceTime | `number` | 500 | 防抖时间，单位 ms，只对 `ProSelect` 且 `remote` 为 `true` 时有效  |  |

### 通用方法
`除了支持组件本身的方法外，还加了一些通用的方法`

| 名称 | 类型 | 说明 | 版本 |
| --- | --- | --- | --- |
| getOptions | `() => any[]` | 获取选项 | |
| setOptions | `(opts:any[]) => void` | 设置选项 | |
| getFetchControls | [FetchControls](async-field#FetchControls) | 获取请求控制器 | |

### ProTransfer 新增 Props
| 名称 | 类型 | 默认值 | 说明 | 版本 |
| --- | --- | --- | --- | --- |
| spinProps | `SpinProps` | `{}` | 传递给 NSpin 组件的属性 | |

`注意：这些属性应该书写到组件的 props 中`
```html
<pro-transfer
  :spin-props="{
    // 在这里写
  }"
/>
```

`fiedProps` 中也新增了一些属性
| 名称 | 类型 | 默认值 | 说明 | 版本 |
| --- | --- | --- | --- | --- |
| labelField | `string` | `'label'` | 选项 label 的字段名 | |
| valueField | `string` | `'value'` | 选项 value 的字段名 | |
| options | `TransferOption[]` | | 配置选项内容 | |

`注意：这些属性应该书写到组件的 fieldProps 中`
```html
<pro-transfer
  :field-props="{
    // 在这里写
  }"
/>
```

### ProRadioGroup 新增 Props
| 名称 | 类型 | 默认值 | 说明 | 版本 |
| --- | --- | --- | --- | --- |
| spinProps | `SpinProps` | `{}` | 传递给 NSpin 组件的属性 | |
| flexProps | `FlexProps` | `{}` | 传递给 NFlex 组件的属性 | |

`注意：这些属性应该书写到组件的 props 中`
```html
<pro-radio-group
  :spin-props="{
    // 在这里写
  }"
  :flex-props="{
    // 在这里写
  }"
/>
```

`fiedProps` 中也新增了一些属性
| 名称 | 类型 | 默认值 | 说明 | 版本 |
| --- | --- | --- | --- | --- |
| labelField | `string` | `'label'` | 选项 label 的字段名 | |
| valueField | `string` | `'value'` | 选项 value 的字段名 | |
| options | `Array<Omit<RadioProps,'checked' \| 'defaultChecked' \| 'onUpdateChecked' \| 'onUpdate:checked'>>` | | 配置选项内容 | |

`注意：这些属性应该书写到组件的 fieldProps 中`
```html
<pro-radio-group
  :field-props="{
    // 在这里写
  }"
/>
```

### ProCheckboxGroup 新增 Props
| 名称 | 类型 | 默认值 | 说明 | 版本 |
| --- | --- | --- | --- | --- |
| spinProps | `SpinProps` | `{}` | 传递给 NSpin 组件的属性 | |
| flexProps | `FlexProps` | `{}` | 传递给 NFlex 组件的属性 | |

`注意：这些属性应该书写到组件的 props 中`
```html
<pro-checkbox-group
  :spin-props="{
    // 在这里写
  }"
  :flex-props="{
    // 在这里写
  }"
/>
```

`fiedProps` 中也新增了一些属性
| 名称 | 类型 | 默认值 | 说明 | 版本 |
| --- | --- | --- | --- | --- |
| labelField | `string` | `'label'` | 选项 label 的字段名 | |
| valueField | `string` | `'value'` | 选项 value 的字段名 | |
| options | `Array<Omit<CheckboxProps,'checked' \| 'defaultChecked' \| 'onUpdateChecked' \| 'onUpdate:checked'>>` | | 配置选项内容 | |

`注意：这些属性应该书写到组件的 fieldProps 中`
```html
<pro-checkbox-group
  :field-props="{
    // 在这里写
  }"
/>
```

### ProTreeSelect 新增 Props
`fieldProps` 中新增了一些属性

| 名称 | 类型 | 默认值 | 说明 | 版本 |
| --- | --- | --- | --- | --- |
| leafField | `string` | `'label'` | 选项 isLeaf 的字段名 | |
| remote | `boolean` | `false` | 是否为懒加载，搭配 fetchConfig 使用 | |
| filterEmptyChildrenField | `boolean` | `true` | 是否过滤掉空子节点字段（空数组或者 undefined/null） | |
| expandAllOnFetchSuccess | `boolean` | `false` | 请求成功后是否展开全部节点（搭配 fetchConfig） | |

`注意：这些属性应该书写到组件的 fieldProps 中`
```html
<pro-tree-select
  :field-props="{
    // 在这里写
  }"
/>
```

### ProTreeSelect 方法
`除了支持组件的方法和通用的方法外，还加了一些额外的方法`
| 名称 | 类型 | 说明 | 版本 |
| --- | --- | --- | --- |
| getFullKeys | `() => Array<string \| number>` | 获取全部节点的 keys | |
| getCheckedKeys | `() => Array<string \| number>` | 获取勾选的节点 keys | |
| getExpandedKeys | `() => Array<string \| number>` | 获取展开的节点 keys | |
| getIndeterminateKeys | `() => Array<string \| number>` | 获取部分选中选项的 keys | |
| getEnabledKeys | `() => Array<string \| number>` | 获取 `disabled` 为 false 并且 `checkboxDisabled` 为 false 的 keys | |
| getLevelKeys | `(level: number, needLtLevelKey?: boolean) => Array<string \| number>` | 获取指定层级的 keys，`level` 从1开始，`needLtLevelKey` 代表是否需要小于指定层级的 keys，默认值 true | |
| setCheckedKeys | `(keys?: Array<string \| number>) => void` | 勾选节点，不传参数勾选所有 | |
| setExpandedKeys | `(keys?: Array<string \| number>) => void` | 展开节点，不传参数展开全部 | |
| setIndeterminateKeys | `(keys: Array<string \| number>) => void` | 设置部分选中 keys | |

### FetchControls
```ts
interface FetchControls {
  /**
   * 请求失败后的信息
   */
  error: Ref<any>
  /**
   * 是否在请求中
   */
  loading: Ref<boolean>
  /**
   * 请求失败后的回调，参数为错误内容
   * ```example
   * onFailure((error) =>{
   *   message.error(error)
   * })
   * ```
   */
  onFailure: EventHookOn<any>
  /**
   * 响应结果
   */
  data: Ref<any>
  /**
   * 调用 api 函数，返回布尔值，传递的参数会透传给 api
   */
  runBool: (...args: any[]) => Promise<boolean>
  /**
   * 请求成功后的回调，参数为响应结果(被 transform 过的)
   * ```example
   * onSuccess((transformedResponse) =>{})
   * ```
   */
  onSuccess: EventHookOn<any>
  /**
   * 调用 api 函数，返回 [err,response]
   * 如果没有发生错误，err 为 undefined，response 为响应结果
   * 如果发生了错误，err 为错误原因，response 为 undefined
   */
  run: (...args: any[]) => Promise<[any, any]>
}
```
