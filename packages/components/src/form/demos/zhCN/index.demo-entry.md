# 表单 ProForm
<!--single-column-->

ProForm 是对 [NForm](https://www.naiveui.com/zh-CN/os-theme/components/form) 的二次封装,你不在需要管理复杂的表单数据,我们内置了数据管理,同时 Modal 表单、Drawer 表单、查询表单、表单列表等多种可以覆盖大部分的使用场景,用更少的代码完成更多的功能



## 演示

```demo
basic.vue
initial-value.vue
watch-value.vue
clearable.vue
all-form.vue
form-layout.vue
async-form.vue
```

## API
### ProForm 属性
| 名称                                                                                  | 类型                                                     | 默认值    | 说明                                                 | 版本 |
| ------------------------------------------------------------------------------------- | -------------------------------------------------------- | --------- | ---------------------------------------------------- | ---- |
| form                                                                                  | 必填,参考 <n-a href="#createProForm">createProForm</n-a> | `-`       | 表单控制器                                           |      |
| readonly                                                                              | `boolean`                                                | `-`       | 表单是否为只读状态                                   |      |
| submitOnPressEnter                                                                    | `boolean`                                                | `false`   | 是否在按下回车后提交表单                             |      |
| validateBehavior                                                                      | `ValidateBehavior`                                       | `-`       | 设为 `popover` 时验证不通过会通过 `popover` 进行提示 |      |
| validationTrigger                                                                     | `ValidationTrigger \| ValidationTrigger[]`               | `'input'` | 表单验证时机                                         |      |
| validateBehaviorProps                                                                 | `PopoverProps`                                           | `-`       | 验证不通过时传递的属性,只对 `popover` 生效           |      |
| [参考 NForm Props](https://www.naiveui.com/zh-CN/os-theme/components/form#Form-Props) |                                                          |           | 不支持 `model` 属性,内置数据管理                     |      |

### createProForm
创建一个表单控制器,如果已经注册了控制器,想在后代组件中使用,无需透传,可以使用 `useInjectProForm` 方法直接注入
```html
<!-- 父组件 -->
<script setup lang="ts">
import { createProForm } from 'pro-naive-ui'

const proForm = createProForm<{name:string}>()
</script>

<template>
  <pro-form :form="proForm">
    <pro-input path="name" />
  </pro-form>
</template>

<!-- 后代组件 -->
<script setup lang="ts">
import { useInjectProForm } from 'pro-naive-ui'

const proForm = useInjectProForm<{name:string}>()!
</script>

<template>
  <n-button @click="proForm.submit">手动提交表单</n-button>
</template>
```

### createProForm Options
下面列举的参数是传递给 `createProForm` 的,引用到的类型声明介绍如下
```typescript
interface ValidateError {
  field?: string
  message?: string
  fieldValue?: any
}
```


| 名称                              | 类型                                                                  | 默认值 | 说明                                                                           | 版本 |
| --------------------------------- | --------------------------------------------------------------------- | ------ | ------------------------------------------------------------------------------ | ---- |
| initialValues                     | `object`                                                              | `{}`   | 表单初始值,表单重置时会参考初始值                                              |      |  |
| omitNil                           | `boolean`                                                             | `true` | 提交或调用 `getFieldsTransformedValue` 时是否忽略 `null` 和 `undefined` 的数据 |      |  |
| onReset                           | `() => void`                                                          | `-`    | 数据重置后的回调                                                               |      |  |
| onSubmit                          | `(values: any, warnings: ValidateError[][]) => void \| Promise<void>` | `-`    | 数据验证成功后的回调,如果是一个 Promise, `submiting` 将等待这个 Promise 完成   |      |  |
| onSubmitFailed                    | `(errors: ValidateError[][]) => void`                                 | `-`    | 数据验证失败后回调                                                             |      |  |
| onValueChange                     | `(opt:{ value: any; path: string }) => void`                          | `-`    | 任何一项值发生变化后的回调(手动交互才会触发)                                   |      |  |
| onDependenciesValueChange         | `(opt:{ value: any; path: string; depPath: string;}) => void`         | `-`    | 依赖项的值发生变化后的回调(手动交互才会触发)                                   |      |  |
| validateOnDependenciesValueChange | `boolean`                                                             | `true` | 依赖项的值发生变化后是否进行校验                                               |      |  |

### createProForm Returned
下面列举的参数是调用 `createProForm` 函数返回的,引用到的类型声明介绍如下
```typescript
import type { FormInst } from 'naive-ui'
import type { Ref, DeepReadonly } from 'vue'
import type { InternalPath, PathPattern } from 'pro-naive-ui'

interface FormItemInternalValidationResult {
  valid: boolean
  errors: ValidateError[]
  warnings: ValidateError[]
}
```


| 名称                      | 类型                                                               | 说明                                                                                                                                                                             | 版本 |
| ------------------------- | ------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---- |
| values                    | `Ref<DeepReadonly<object>>`                                        | 所有的值（包含用户设置的和可能被隐藏的字段） 注意：它是只读的,表单值修改你应该调用 `setFieldValue` 或 `setFieldsValue`                                                           |      |  |
| submit                    | `() => void`                                                       | 手动提交表单,如果按钮包含在 `pro-form` 中,建议使用 `attr-type` 为 `submit` 提交                                                                                                  |      |
| validate                  | `(paths?: InternalPath) => ReturnType<FormInst['validate']>`       | 校验单个字段、多个字段或整个表单                                                                                                                                                 |      |
| submiting                 | `Ref<boolean>`                                                     | 是否正在提交表单,需要提供 `onSubmit` 函数才会生效                                                                                                                                |      |  |
| matchPath                 | `(pattern: PathPattern) => string[]`                               | 匹配路径,返回匹配到的路径数组                                                                                                                                                    |      |  |
| getFieldValue             | `(path: InternalPath) => void`                                     | 获取指定路径字段的值                                                                                                                                                             |      |
| getFieldsValue            | `(paths?: Array<string \| string[]> \| true) => object`            | 参数如果为 `true`,获取完整的值(包含被删除或者设置进去的非表单值),如果为空,获取的是表单值,传入路径,则为路径值                                                                     |      |
| setFieldValue             | `(path: InternalPath, value: any) => void`                         | 设置指定路径字段的值                                                                                                                                                             |      |
| setFieldsValue            | `(values: object,strategy: 'overwrite' \| 'shallowMerge') => void` | 设置多个路径字段的值,`strategy` 有2种合并值的策略,`shallowMerge` 代表和表单值浅合并,`overwrite` 代表重写表单值,默认值为 `overwrite`                                              |      |
| resetFieldValue           | `(path: InternalPath) => void`                                     | 重置指定路径字段的值                                                                                                                                                             |      |
| setInitialValue           | `(path: InternalPath, value: any) => void`                         | 设置指定路径字段的初始值,重置字段值时会重置为设置的初始值或者本身的初始值                                                                                                        |      |
| resetFieldsValue          | `() => void`                                                       | 重置所有字段的值                                                                                                                                                                 |      |
| setInitialValues          | `(values: object,strategy: 'overwrite' \| 'shallowMerge') => void` | 设置多个字段初始值,重置字段值时会重置为设置的初始值或者本身的初始值,`strategy` 有2种合并值的策略,`shallowMerge` 代表和表单值浅合并,`overwrite` 代表重写表单值,默认为 `overwrite` |      |
| restoreFieldValue         | `(path: InternalPath) => void`                                     | 重置指定路径字段的值并清空校验                                                                                                                                                   |      |
| restoreValidation         | `(paths?: InternalPath) => void`                                   | 清空单个字段、多个字段或整个表单的校验                                                                                                                                           |      |
| restoreFieldsValue        | `() => void`                                                       | 重置所有字段的值并清空校验,如果按钮包含在 `pro-form` 中,建议使用 `attr-type` 为 `reset` 重置                                                                                     |      |
| getFieldsTransformedValue | `() => object`                                                     | 获取表单值,不包含被隐藏的和用户设置的（但是被 transform 处理过的）                                                                                                               |      |
| getFieldValidationResult  | `(path: InternalPath) => FormItemInternalValidationResult \| null` | 获取字段值的校验结果                                                                                                                                                             |      |
| pauseDependenciesTrigger  | `() => void`                                                       | 手动暂停 `onDependenciesValueChange` 的触发                                                                                                                                      |      |
| resumeDependenciesTrigger | `() => void`                                                       | 手动恢复 `onDependenciesValueChange` 的触发                                                                                                                                      |      |
