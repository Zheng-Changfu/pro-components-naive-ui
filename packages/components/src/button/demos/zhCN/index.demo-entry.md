# 按钮 ProButton

<n-alert type="success" title="提示" show-icon :bordered="false">
增加自动 loading<br />
增加 tooltip 以及 disabledTooltip，不忍心看大家写判断了<br />
增加权限控制，需要搭配 ProConfigProvider<br />
没有破坏性变更，你可以把它当成 NButton<br />
</n-alert>

## 演示

```demo
auto-loading.vue
tooltip.vue
auth.vue
```

## API

### ProButton 新增 Props

| 名称 | 类型 | 默认值 | 说明 | 版本 |
| --- | --- | --- | --- | --- |
| autoLoading | `boolean` | `true` | 是否自动检测异步函数开启 loading |  |
| tooltip | `string \| string[]` | `undefined` | 提示文字，单行使用字符串表示，多行使用字符串数组表示，禁用时不生效 |  |
| disabledTooltip | `string \| string[]` | `undefined` | 禁用时的提示文字，单行使用字符串表示，多行使用字符串数组表示，非禁用时不生效 |  |
| auth | `any` | `undefined` | 权限编码，可以是任意数据，配合 `ProConfigProvider` 使用 |  |

