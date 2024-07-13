# 表单 ProForm
<!--single-column-->
<n-flex vertical>
    <n-alert type="success" title="提示" show-icon :bordered="false">
    增加了太多功能，自己看演示吧<br />
  </n-alert>
</n-flex>

## 演示

```demo
basic.vue
disabledAndReadonly.vue
initialValue.vue
transform.vue
postState.vue
addonSlot.vue
customRenderReadonly.vue
customRenderFormItem.vue
customRenderField.vue
customRenderFieldGroup.vue
formLayout.vue
dependenciesUsage.vue
dependenciesTriggerGuard.vue
linkExpression.vue
linkRegister.vue
linkOneToMany.vue
linkDep.vue
linkChain.vue
linkLoop.vue
linkSelf.vue
linkAsync.vue
linkMultipleForm.vue
formApi.vue
```

## API
### ProForm 新增 Props

| 名称 | 类型 | 默认值 | 说明 | 版本 |
| --- | --- | --- | --- | --- |
| expressionScope | `Record<string, any>` | `undefined` | 表达式可以读取到的作用域，浅合并，优先级比全局高 |  |
| initialValues | `Object` | `undefined` | 表单初始值 |  |
| onSubmit | `(values: Record<string, any>, warnings: ValidateError[][]) => void` | `undefined` | 数据验证成功后回调事件 |  |
| onSubmitFailed | `(errors: ValidateError[][]) => void` | `undefined` | 数据验证失败后回调事件 |  |
| onFieldValueChange | `(opt: { field: BaseField \| ArrayField, value:any }) => void` | | 字段值发生变化时触发的回调函数 |  |
| onDependenciesValueChange | `(opt: { path: string[], depPath: string[], value: any }) => void` | | 依赖项的值发生变化时触发的回调函数 |  |
| formItemRender | `(opt: { bindValues: FormItemProps, bindSlots: Record<string, any> }) => VNodeChild` | | 自定义渲染 formItem，优先级比 ProFormItem 低 |  |

### ProForm 不兼容属性

| 名称 | 说明 | 版本 |
| --- | --- | --- |
| model | 表单值内部进行管理 |  |
| rules | 校验规则在控件上写 |  |

### ProForm Methods
| 名称 | 类型 | 说明 | 版本 |
| --- | --- | --- | --- |
| matchPath | `(pathMatch: PathMatch) => string[]` | 匹配字段，返回匹配到的字段数组 |  |
| getFieldValue | `() => void` | 获取指定路径字段的值 |  |
| getFieldsValue | `(paths?: Array<Path> \| true) => Record<string,any>` | 参数如果为 `true`,获取完整的值(包含被删除或者设置进去的非表单值)，如果为空，获取的是表单值，传入路径，则为路径值 |  |
| setFieldValue | `(path: Path, value: any) => void` | 设置指定路径字段的值 |  |
| setFieldsValue | `(values: Record<string,any>) => void` | 设置多个路径字段的值 |  |
| resetFieldValue | `(path: Path) => void` | 重置指定路径字段的值 |  |
| restoreFieldValue | `(path: Path) => void` | 重置指定路径字段的值并清空校验 |  |
| resetFieldsValue | `() => void` | 重置所有字段的值 |  |
| restoreFieldsValue | `() => void` | 重置所有字段的值并清空校验 |  |
| setInitialValue | `(path: Path, value: any) => void` | 设置指定路径字段的初始值，重置字段值时会重置会设置的初始值或者本身的初始值  |  |
| setInitialValues | `(values: Record<string,any>) => void` | 设置多个字段初始值，重置字段值时会重置会设置的初始值或者本身的初始值 |  |
| getFieldsTransformedValue | `() => Record<string,any>` | 获取表单值，不包含被隐藏的和设置过的（但是被 transform 处理过的） |  |
| validate | `(paths?: string \| string[]) => ReturnType<FormInst['validate']>` | 校验单个字段、多个字段或表单 |  |
| submit | `() => void` | 提交表单 |  |
| restoreValidation | `(paths?: string \| string[]) => ReturnType< FormInst['restoreValidation'] >` | 清空单个字段、多个字段或表单的校验 |  |
| getExpressionScope | `() => Record<string,any>` | 获取表单的表达式作用域对象 |  |

### 控件新增 Props
| 名称 | 类型 | 默认值 | 说明 | 版本 |
| --- | --- | --- | --- | --- |
| simple | `boolean` | `false` | 精简模式，不包装 FormItem |  |
| readonly | `boolean` | `undefined` | 是否为只读态 |  |
| initialValue | `any` | `undefined` | 初始值，优先级大于表单的 initialValues |  |
| value | `any` | `undefined` | 表单值，优先级大于 initialValue |  |
| preserve | `boolean` | `true` | 字段被隐藏或删除时是否还保留值 |  |
| visible | `boolean` | `undefined` | 是否显示 |  |
| hidden | `boolean` | `undefined` | 是否隐藏 |  |
| placeholder | `any` | `undefined` | 会透传给支持 placeholder 的控件 |  |
| fieldProps | `Record<string,any>` | `{}` | 控件的 props，比如 `ProInput` 控件，这里就支持 `NInput` 的所有 `props`，其他控件同理 |  |
| fetchConfig | [异步控件](async-field#通用-fetchConfig) | `{}` | 此属性只会在异步控件上生效 |  |
| dependencies | `Dependencie \| Dependencie[]` | `undefined` | 字段的依赖项，当依赖项的值发生变化时，会触发当前字段校验 |  |
| postState | `(val: any) => any` | `undefined` | 后置状态钩子，可以二次修改数据，返回的值为表单的最终结果值，字段值变化后会触发该钩子 |  |
| onChange | `(val: any) => void` | `undefined` | 字段值发生变化后触发的回调函数 |  |
| transform | `(val: any, path: string) => any` | `undefined` | 转换字段的值，如果返回的是一个对象，将和当前字段所在层级的对象进行深度合并 |  |
| renderReadonly | `((opt: { value: any }) => VNodeChild)` | `undefined` | 自定义渲染只读模式下的控件 |  |
| renderReadonlyEmpty | `((opt: { value: any }) => VNodeChild)` | `undefined` | 自定义渲染只读模式下并且内容为空时的控件 |  |
| fieldRender | `(opt: { bindValues:Record<string, any>, bindSlots: Record<string, any> }) => VNodeChild` | `undefined` | 自定义渲染控件 |  |
| formItemRender | `(opt: { bindValues: FormItemProps, bindSlots: Record<string, any> }) => VNodeChild` | `undefined` | 自定义渲染 FormItem |  |
| fieldGroupRender | `(opts: { vnode: VNodeChild }) => VNodeChild` | `undefined` | 自定义渲染控件组（控件 + 前后缀插槽） |  |

### 控件的注意事项
1. 所有表单控件的 `placeholder` 应该在控件的一级属性上直接书写，会透传给渲染的组件
   ```html
    <pro-input placeholder="用户名" />
   ```
2. 表单控件不支持 `defaultValue` 或者 `v-model:xx`，请使用 `initialValue`、`value`、`initialValues` 或者 `Api` 代替
3. 控件如果想拿到实例，推荐使用 `useProXXXInstance` 方法，比如想拿到 `ProInput` 实例
  ```html
  <script setup>
    import { useProInputInstance } from 'pro-components-naive-ui'
    const [instRef,{ blue, focus }] = useProInputInstance()
  </script>
  <template>
    <pro-input ref="instRef" />
  </template>
  ```

### 控件原理说明
表单控件可以看成 `form-item` + `组件`，例如
```html
  <pro-input></pro-input>
```
等价于
```html
  <n-form-item>
    <n-input></n-input>
  </n-form-item>
```
`n-form-item` 的属性可以在控件上直接书写，`n-input` 的所有属性被放在了 `field-props` 上，为了方便，`placeholder` 放在了上层，会透传给表单，如以下代码
```html
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
```
等价于
```html
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
```

### 全部表单控件
支持异步数据源的表单控件都会有一个 `fetchConfig` 属性

| 控件名称 | 说明 | 异步数据源 | 获取控件实例函数 | 版本 |
| - | - | - | - | - |
| ProInput | 输入框 | ❌ | `useProInput` | |
| ProDigit | 数字输入框 | ❌ | `useProDigit` | |
| ProPassword | 密码输入框 | ❌ | `useProPassword` | |
| ProTextarea | 文本域 | ❌ | `useProTextarea` | |
| ProDate | 日期选择器 | ❌ | `useProDate` | |
| ProDateYear | 年选择器 | ❌ | `useProDateYear` | |
| ProDateWeek | 周选择器 | ❌ | `useProDateWeek` | |
| ProDateMonth | 月选择器 | ❌ | `useProDateMonth` | |
| ProDateQuarter | 季度选择器 | ❌ | `useProDateQuarter` | |
| ProTime | 时间选择器 | ❌ | `useProTime` | |
| ProDateRange | 日期范围选择器 | ❌ | `useProDateRange` | |
| ProDateYearRange | 年范围选择器 | ❌ | `useProDateYearRange` | |
| ProDateMonthRange | 月范围选择器 | ❌ | `useProDateMonthRange` | |
| ProDateQuarterRange | 季度范围选择器 | ❌ | `useProDateQuarterRange` | |
| ProRadio | 单选框 | ❌ | |
| ProRadioGroup | 单选框组 | ✅ | `useProRadioGroup` |
| ProCheckbox | 复选框 | ❌ | `useProCheckbox` |
| ProCheckboxGroup | 复选框组 | ✅ | `useProCheckboxGroup` |
| ProRate | 评分 | ❌ | |
| ProSlider | 滑动选择 | ❌ | |
| ProSelect | 选择器 | ✅ | `useProSelect` |
| ProSwitch | 开关 | ❌ | |
| ProUpload | 上传 | ❌ | `useProUpload` |
| ProTransfer | 穿梭框 | ✅ | `useProTransfer` |
| ProTreeSelect | 树型选择 | ✅ | `useProTreeSelect` |

### 表达式内置变量
| 名称 | 别名 | 说明 | 版本 |
| --- | --- | --- | --- |
| $self | | 当前字段值 | |
| $values | $vals | 整个表单的值，包含了已经被隐藏的字段和用户设置的字段 | |
| $row | $record | 当前行的值，只会在 `ProFormList` 中生效，其他返回的是空对象 | |
| $length | $len | 当前所在列表的长度，只会在 `ProFormList` 中生效，其他返回的是 0 | |
| $rowIndex | $index | 当前字段在列表中的索引，只会在 `ProFormList` 中生效，其他返回的是 -1 | |

### 支持表达式的属性
1. `ProForm` 组件的 `disabled` 和 `readonly`
3. 表单控件除以下这些属性外，其他都支持表达式，包括 `attrs` 和 `class`
  ```ts
  const unSupportExpressionAttributes = [
    'onChange',
    'preserve',
    'postState',
    'transform',
    'fieldRender',
    'dependencies',
    'initialValue',
    'formItemRender',
    'renderReadonly',
    'fieldGroupRender',
    'renderReadonlyEmpty',
  ] as const
  ```
