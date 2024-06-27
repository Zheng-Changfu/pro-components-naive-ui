# 表单通用配置

## 重大变更（必看）
表单组件 = ProFormItem + 组件本身，例如以下代码
```html
<template>
  <pro-input></pro-input>
</template>
```
可以看成以下组合
```html
<template>
  <n-form-item>
    <n-input></n-input>
  </n-form-item>
</template>
```
`n-input` 的所有属性被放在了 `field-props` 上，`form-item` 的属性正常书写即可，为了方便，`placeholder` 放在了上层，会透传给表单，如以下代码
```html
<template>
  <pro-input 
    label="用户名" 
    path="username" 
    required
    placeholder="请输入用户名"
    :field-props="{
      clearable:true,
      minlength:10,
      maxlength:20
    }"
  >
  </pro-input>
</template>
```
可以看成是如下代码
```html
<template>
  <n-form-item
    label="用户名" 
    path="username" 
    required
  >
    <n-input 
      clearable
      placeholder="请输入用户名"
      :minlength="10"
      :maxlength="20"
    ></n-input>
  </n-form-item>
</template>
```

对于表单值，有一些需要注意的点，如果你需要设定表单组件的默认值，请使用 `initialValue` 或者 `ProForm.initialValues` 或者 `value` 都可以，你可以用以下这几种方法设定默认值

优先级：value > initialValue > initialValues
1. 使用 `initialValue` 属性
```html
<template>
  <pro-input initial-value="123"></pro-input>
</template>
```
2. 使用 `value` 属性
```html
<template>
  <pro-input value="123"></pro-input>
</template>
```
3. 使用 `ProForm.initialValues` 属性
```html
<template>
  <pro-form :initial-values="{name:'123'}">
    <pro-input path="name"></pro-input>
  </pro-form>
</template>
```

## 通用属性

| 名称 | 类型 | 默认值 | 说明 | 版本 |
| --- | --- | --- | --- | --- |
| simple | `boolean` | `false` | 精简模式，不包装 `ProFormItem` | |
| readonly | `boolean` | `undefined` | 是否切换到只读状态 | |
| fieldProps | `Record<string,any>` | `{}` | 传递给表单组件的属性 | |
| placeholder | `any` | `undefined` | 透传给表单组件的属性 | |
| formItemRender | `(domVNode: VNodeChild) => VNodeChild` | `undefined` | 自定义 `ProFormItem`，可以用来进行自定义布局，`domVNode` 为 `ProFormItem` 的虚拟节点 | |
| fieldRender | `(domVNode: VNodeChild) => VNodeChild` | `undefined` | 自定义控件，可以用来进行自定义布局，`domVNode` 为控件的虚拟节点 | |
| initialValue | `any` | `undefined` | 初始值，优先级大于 `ProForm` 组件的 initialValues | |
| preserve | `boolean` | `true` | 字段被隐藏或删除时是否还保留值 | |
| value | `any` | `undefined` | 表单值，优先级大于 initialValue | |
| visible | `boolean` | `undefined` | 是否显示 | |
| hidden | `boolean` | `undefined` | 是否隐藏 | |
| dependencies | `Dependencie \| Dependencie[]` | `undefined` | 字段的依赖项，当依赖项的值发生变化时，会触发校验 | |
| postState | `(val: any) => any`  | `undefined` | 后置状态钩子，可以二次修改数据，返回的值为表单的最终结果值 | |
| onChange | `(val: any) => void`  | `undefined` | 表单值发生变化后触发的回调函数 | |
| transform | `(val: any) => void`  | `undefined` | 转换字段的值，后端想要的数据结构或者字段名称不一致时会用到，表单提交或者使用 `proFormInst.getFieldsTransformedValue` 方法触发 | |

## 通用插槽
| 属性 | 参数 | 说明 | 版本 |
| --- | --- | --- | --- |
| readonly | `{value:any}` | 只读状态下渲染的内容 | | 
| readonly-empty | `{value:any}` | 只读状态下并且内容为空时渲染的内容 | | 
| addon-before | `{}` | 表单组件的前缀插槽 | | 
| addon-after | `{}` | 表单组件的后缀插槽 | | 

## 所有表单组件
支持异步数据源的表单控件都会有一个 `fetchConfig` 属性

| 控件名称 | 说明 | 异步数据源 | 获取控件实例函数 | 表达式不支持属性 | 版本 |
| - | - | - | - | - | - |
| `ProInput` | 输入框 | ❌ | `useProInput` | | | 
| `ProDigit` | 数字输入框 | ❌ | `useProDigit` | | | 
| `ProPassword` | 密码输入框 | ❌ | `useProPassword` | | | 
| `ProTextarea` | 文本域 | ❌ | `useProTextarea` | | | 
| `ProDate` | 日期选择器 | ❌ | `useProDate` | `type`、`valueFormat` | | 
| `ProDateYear` | 年选择器 | ❌ | `useProDateYear` | `type`、`valueFormat` | | 
| `ProDateWeek` | 周选择器 | ❌ | `useProDateWeek` | `type`、`valueFormat` | | 
| `ProDateMonth` | 月选择器 | ❌ | `useProDateMonth` | `type`、`valueFormat` | | 
| `ProDateQuarter` | 季度选择器 | ❌ | `useProDateQuarter` | `type`、`valueFormat` | | 
| `ProTime` | 时间选择器 | ❌ | `useProTime` | `type`、`valueFormat` | | 
| `ProDateRange` | 日期范围选择器 | ❌ | `useProDateRange` | `type`、`valueFormat` | | 
| `ProDateYearRange` | 年范围选择器 | ❌ | `useProDateYearRange` | `type`、`valueFormat` | | 
| `ProDateMonthRange` | 月范围选择器 | ❌ | `useProDateMonthRange` | `type`、`valueFormat` | | 
| `ProDateQuarterRange` | 季度范围选择器 | ❌ | `useProDateQuarterRange` | `type`、`valueFormat` | | 
| `ProRadio` | 单选框 | ❌ | | | | 
| `ProRadioGroup` | 单选框组 | ✅ | `useProRadioGroup` | | | 
| `ProCheckbox` | 复选框 | ❌ | `useProCheckbox` | | | 
| `ProCheckboxGroup` | 复选框组 | ✅ | `useProCheckboxGroup` | | | 
| `ProRate` | 评分 | ❌ | | | | 
| `ProSlider` | 滑动选择 | ❌ | | | | 
| `ProSelect` | 选择器 | ✅ | `useProSelect` | | | 
| `ProSwitch` | 开关 | ❌ | | | | 
| `ProUpload` | 上传 | ❌ | `useProUpload` | | | 
| `ProTransfer` | 穿梭框 | ❌ | `useProTransfer` | | | 
| `ProTreeSelect` | 树型选择 | ✅ | `useProTreeSelect` | | | 

