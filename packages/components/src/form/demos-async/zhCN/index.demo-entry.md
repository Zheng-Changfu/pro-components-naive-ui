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
### ProForm 新增 Props

| 名称 | 类型 | 默认值 | 说明 | 版本 |
| --- | --- | --- | --- | --- |
| expression | `Record<string, any>` | `undefined` | 表达式，浅合并，优先级比全局高 |  |
| initialValues | `Object` | `undefined` | 表单初始值 |  |
| onSubmit | `(values: Record<string, any>, warnings: ValidateError[][]) => void` | `undefined` | 数据验证成功后回调事件 |  |
| onSubmitFailed | `(errors: ValidateError[][]) => void` | `undefined` | 数据验证失败后回调事件 |  |
| onFieldValueChange | `(opt: {field: BaseField \| ArrayField,value:any}) => void` | 字段值发生变化时触发的回调函数 |  |
| onDependenciesValueChange | `(opt: {path: string[],depPath: string[],value: any}) => void` | 依赖项的值发生变化时触发的回调函数 |  |
| renderFormItem | `(opt: {bindValues: FormItemProps,bindSlots: Record<string, any>}) => VNodeChild` | 自定义渲染 formItem，优先级比 ProFormItem 低 |  |
