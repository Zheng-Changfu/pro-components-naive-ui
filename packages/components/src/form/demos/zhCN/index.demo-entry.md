# 表单 ProForm
<!--single-column-->

我们封装 `ProForm` 组件解决了 `NaiveUi` 的一些比较麻烦的点，如
- 重置表单
- 初始值需要为 `null`
- 必填校验在某些表单项上需要设定 `type` 属性
- 想在 `label` 旁边增加 `tooltip`
- ...

## 演示

```demo
basic.vue
initialValue.vue
transform.vue
postState.vue
addon.vue
customReadonly.vue
customFieldGroup.vue
formLayout.vue
formApi.vue
```

## API
### ProForm 属性
| 名称 | 类型 | 默认值 | 说明 | 版本 |
| --- | --- | --- | --- | --- |
| readonly | `boolean` | | 表单是否切换为只读状态 | |
| scope | `Record<string, any>` | | 表达式可以读取到的作用域，浅合并，优先级比全局高 |  |
| initialValues | `Object` | | 表单初始值 |  |
| validateBehavior | `'default' \| 'popover'` | 'default' | 校验行为，为 popover 时验证不通过会通过 popover 进行提示 | |
| validateBehaviorProps | `PopoverProps` | | 验证不通过时传递的属性，只对 popover 生效 | |
| onSubmit | `(values: Record<string, any>, warnings: ValidateError[][]) => void` | | 数据验证成功后回调事件 |  |
| onSubmitFailed | `(errors: ValidateError[][]) => void` | | 数据验证失败后回调事件 |  |
| onFieldValueChange | `(opt: { field: BaseField \| ArrayField, value:any }) => void` | | 字段值发生变化时触发的回调函数 |  |
| onDependenciesValueChange | `(opt: { path: string[], dependPath: string[], value: any }) => void` | | 依赖项的值发生变化时触发的回调函数 |  |
| [...NFormProps](https://www.naiveui.com/zh-CN/os-theme/components/form) |  | |  |  |

### ProForm 不兼容属性

| 名称 | 说明 | 版本 |
| --- | --- | --- |
| model | 表单值内部进行管理 |  |
| rules | 校验规则在控件上写 |  |

### ProForm 实例方法
使用 `useProFormInst` 可以拿到组件方法，如果想在子组件中使用，可以使用 `useInjectProFormInst` 方法直接注入

| 名称 | 类型 | 说明 | 版本 |
| --- | --- | --- | --- |
| matchPath | `(pathMatch: PathMatch) => string[]` | 匹配字段，返回匹配到的字段数组 |  |
| getFieldValue | `() => void` | 获取指定路径字段的值 |  |
| getFieldsValue | `(paths?: Array<Path> \| true) => Record<string,any>` | 参数如果为 `true`,获取完整的值(包含被删除或者设置进去的非表单值)，如果为空，获取的是表单值，传入路径，则为路径值 |  |
| setFieldValue | `(path: Path, value: any) => void` | 设置指定路径字段的值 |  |
| setFieldsValue | `(values: Record<string,any>,strategy:ValueMergeStrategy = 'merge') => void` | 设置多个路径字段的值,`strategy` 有3种合并值的策略，`merge` 代表深度和表单值合并，`shallowMerge` 代表和表单值浅合并，`overwrite` 代表重写表单值，默认为 `merge` |  |
| resetFieldValue | `(path: Path) => void` | 重置指定路径字段的值 |  |
| restoreFieldValue | `(path: Path) => void` | 重置指定路径字段的值并清空校验 |  |
| resetFieldsValue | `() => void` | 重置所有字段的值 |  |
| restoreFieldsValue | `() => void` | 重置所有字段的值并清空校验 |  |
| setInitialValue | `(path: Path, value: any) => void` | 设置指定路径字段的初始值，重置字段值时会重置会设置的初始值或者本身的初始值  |  |
| setInitialValues | `(values: Record<string,any>,strategy:ValueMergeStrategy = 'merge') => void` | 设置多个字段初始值，重置字段值时会重置会设置的初始值或者本身的初始值，`strategy` 有3种合并值的策略，`merge` 代表深度和表单值合并，`shallowMerge` 代表和表单值浅合并，`overwrite` 代表重写表单值，默认为 `merge` |  |
| getFieldsTransformedValue | `() => Record<string,any>` | 获取表单值，不包含被隐藏的和设置过的（但是被 transform 处理过的） |  |
| validate | `(paths?: string \| string[]) => ReturnType<FormInst['validate']>` | 校验单个字段、多个字段或表单 |  |
| submit | `() => void` | 提交表单 |  |
| restoreValidation | `(paths?: string \| string[]) => ReturnType< FormInst['restoreValidation'] >` | 清空单个字段、多个字段或表单的校验 |  |
| getScope | `() => Record<string,any>` | 获取表单的表达式作用域对象 |  |
| pauseDependenciesTrigger | `() => void` | 暂停 `onDependenciesValueChange` 的触发 | |
| resumeDependenciesTrigger | `() => void` | 恢复 `onDependenciesValueChange` 的触发 | |

### 表达式内置变量
可以在 `ProConfigProvider` 组件中注入通用的变量
| 名称 | 别名 | 说明 | 版本 |
| --- | --- | --- | --- |
| $self | | 当前字段值 | |
| $values | $vals | 整个表单的值，包含了已经被隐藏的字段和用户设置的字段 | |
| $row | $record | 当前行的值，只会在 `ProFormList` 中生效，其他返回的是空对象 | |
| $total | | 当前所在列表的长度，只会在 `ProFormList` 中生效，其他返回的是 0 | |
| $rowIndex | $index | 当前字段在列表中的索引，只会在 `ProFormList` 中生效，其他返回的是 -1 | |

### 支持表达式的属性
1. `ProForm` 组件的 `disabled` 和 `readonly`
3. 表单项除以下这些属性外，其他都支持表达式，包括 `attrs` 和 `class`
  ```ts
  const unSupportExpressionAttributes = [
    'path',
    'onChange',
    'preserve',
    'postState',
    'transform',
    'dependencies',
    'initialValue',
  ] as const
  ```
