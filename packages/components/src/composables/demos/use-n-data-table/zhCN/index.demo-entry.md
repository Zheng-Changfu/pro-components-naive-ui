# useNDataTable
<!--single-column-->

`useNDataTable` 基于 `useRequest` 实现,封装了常用的 [ProSearchForm](search-form) 与 [NDataTable](https://www.naiveui.com/zh-CN/os-theme/components/data-table) 联动逻辑,
当然你也可以用 `useNDataTable` 搭配 [ProDataTable](data-table) 组件。

在使用之前,你需要了解它与 `useRequest` 不同的几个点：

- `service` 接收两个参数,第一个参数为分页数据 `{ current, pageSize, sorter, filters }`,第二个参数为表单数据。
- `service` 返回的数据结构为 `{ total: number, list: object[] }`。
- 会额外返回 `table` 和 `search` 字段,管理表格和表单。
- `refreshDeps` 变化,会重置 `current` 到第一页,并重新发起请求。

## 演示

```demo
table.vue
table-extra-pagination-prop.vue
search-form.vue
validate.vue
```

## API

### useNDataTable Options

下面列举的参数是传递给 `useNDataTable` 的,引用到的类型声明介绍如下
```typescript
import type { SearchFormLike } from 'pro-naive-ui'
```

| 名称                                              | 类型             | 默认值 | 说明                                                                 | 版本 |
| ------------------------------------------------- | ---------------- | ------ | -------------------------------------------------------------------- | ---- |
| form                                              | `SearchFormLike` | `-`    | `createProSearchForm` 返回值,也可以是满足 `SearchFormLike` 类型的值 |      |
| [参考 useRequest](use-request#useRequest-Options) |                  |        |                                                                      |      |

### useNDataTable Returned

下面列举的参数是调用 `useNDataTable` 函数返回的,引用到的类型声明介绍如下
```typescript
import type { ComputedRef } from 'vue'
import type { DataTableFilterState, DataTableSortState } from 'naive-ui'
```

| 名称                                               | 类型                                                                                                                                               | 默认值 | 说明                                                                   | 版本 |
| -------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- | ------ | ---------------------------------------------------------------------- | ---- |
| table.tableProps                                   | `-`                                                                                                                                                | `-`    | `NDataTable` 组件需要的数据,直接透传给 `NDataTable` 组件即可          |      |
| table.onChange                                     | `(options?: {page?: number;pageSize?: number;filters?: DataTableFilterState;sorter?: DataTableSortState \| DataTableSortState[] \| null}) => void` | `-`    | 手动发起请求,如果没有传递配置,使用默认记录的配置,传递了配置,使用传递的 |      |
| search.submit                                      | `() => void`                                                                                                                                       | `-`    | 提交表单成功后重置 `current` 到第一页,并重新发起请求                  |      |
| search.reset                                       | `() => void`                                                                                                                                       | `-`    | 重置表单成功后重置 `current` 到第一页,并重新发起请求                  |      |
| search.searchLoading                               | `ComputedRef<boolean>`                                                                                                                             | `-`    | 查询时的 `loading`                                                     |      |
| search.resetLoading                                | `ComputedRef<boolean>`                                                                                                                             | `-`    | 重置时的 `loading`                                                     |      |
| search.proSearchFormProps                          | `-`                                                                                                                                                | `-`    | `ProSearchForm` 组件需要的数据,直接透传给 `ProSearchForm` 组件即可    |      |
| [参考 useRequest](use-request#useRequest-Returned) | `-`                                                                                                                                                | `-`    | `ProSearchForm` 组件需要的数据,直接透传给 `ProSearchForm` 组件即可    |      |
