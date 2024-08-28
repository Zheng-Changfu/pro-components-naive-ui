# 描述 ProDescriptions
<!--single-column-->

## 演示

```demo
basic.vue
request.vue
compositionApi.vue
```

## API
### ProDescriptions 属性
**注意：不兼容默认插槽定义 DescriptionsItem，请使用 `columns` 代替**
| 名称 | 类型 | 默认值 | 说明 | 版本 |
| --- | --- | --- | --- | --- |
| data | `Record<string,any>` | | 数据源，建议使用 `request` 获取 | |
| columns | `ProDescriptionColumns` | | DescriptionItems | |
| loading | `boolean` | | 是否在请求中 | |
| manual | `boolean` | false | 是否手动调用 request，设置为 `true` 不会调用 request | |
| refreshOnWindowFocus | `boolean \| { intervalTime: number }` | { intervalTime: 3000 } | 屏幕聚焦刷新请求，默认间隔3秒 | |
| receiveRouteQueryParams | `boolean` | | 是否接收路由的 query 和 params 参数作为请求参数 | |
| request | `Function` | | 请求函数 | |
| transform | `(res:DataSource) => any` | | 请求成功后可以转化数据，返回值为最终的结果值 | |
| onRequestError | `(error:Error) => void` | | 请求失败触发的函数 | |
| onRequestSuccess | `(res:DataSource) => void` | | 请求成功触发的函数 | |
| onRequestComplete | `() => void` | | 请求结束后触发的函数 | |
| [...DescriptionsProps](https://www.naiveui.com/zh-CN/os-theme/components/descriptions#Descriptions-Props) | | | | |

### ProDescriptions 实例方法
使用 `useProDescriptionsInst` 可以拿到组件方法

| 名称 | 类型 | 说明 | 版本 |
| --- | --- | --- | --- |
| reload | `(params?:any) => Promise<void>` | 重新调用 request | |

### ProDescriptionColumn
```ts
interface ProDescriptionColumn<T = any> extends Omit<DescriptionItemProps, 'label'> {
  /**
   * 字段路径
   */
  path?: ExtractObjectPath<T>
  /**
   * title 右边的提示
   */
  tooltip?: string | string[]
  /**
   * 唯一标识，默认内部生成 uid
   */
  key?: string
  /**
   * 组件映射，需要通过 `ProConfigProvider` 的 `valueTypeMap` 映射
   */
  valueType?: FieldValueType
  /**
   * 组件的 props，自定义渲染时无效
   */
  fieldProps?: Record<string, any>
  /**
   * 同 label
   */
  title?: string | (() => VNodeChild)
  /**
   * 标题
   */
  label?: string | (() => VNodeChild)
  /**
   * 当 valueType 不满足需求时，可以自定义渲染
   * @param dataSource 数据源
   */
  render?: (dataSource: T) => VNodeChild
  /**
   * 组件的 slots，自定义渲染时无效
   */
  slots?: Record<string, AnyFn>
  /**
   * 组件前缀
   */
  addonBefore?: string
  /**
   * 组件后缀
   */
  addonAfter?: string
}
```
