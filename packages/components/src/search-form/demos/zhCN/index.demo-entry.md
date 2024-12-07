# 查询表单 ProSearchForm
<!--single-column-->

有些是时候表单要与别的组件组合使用，常见的有 DataTable,这时候就需要一些特殊形态的表单。ProSearchForm 解决了配合组件使用的问题,避免了复杂的样式设置。
因为展现形态比较固定,所以我们以 json 的方式来组织代码,支持完整的类型推导

<n-alert type="warning" title="注意" :bordered="false">
  我们是支持按需加载组件的,所以在使用前确保组件已被 Vue 注册
</n-alert>

## 演示

```demo
basic.vue
dynamic-props.vue
custom-button.vue
```

## API
