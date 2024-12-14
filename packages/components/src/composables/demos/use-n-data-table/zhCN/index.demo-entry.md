# useNDataTable
<!--single-column-->

`useNDataTable` 基于 `useRequest` 实现，封装了常用的 [ProSearchForm](search-form) 与 [NDataTable](https://www.naiveui.com/zh-CN/os-theme/components/data-table) 联动逻辑，
当然你也可以用 `useNDataTable` 搭配 [ProDataTable](data-table) 组件。

在使用之前，你需要了解它与 `useRequest` 不同的几个点：

- `service` 接收两个参数，第一个参数为分页数据 `{ current, pageSize, sorter, filters }`,第二个参数为表单数据。
- `service` 返回的数据结构为 `{ total: number, list: object[] }`。
- 会额外返回 `table` 和 `search` 字段，管理表格和表单。
- `refreshDeps` 变化，会重置 `current` 到第一页，并重新发起请求。

## 演示

```demo
table.vue
table-extra-pagination-prop.vue
search-form.vue
validate.vue
```

## API
