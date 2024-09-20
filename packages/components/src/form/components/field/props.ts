import type { FormItemRule, PopoverProps } from 'naive-ui'
import type { Dependencie, MaybeExpression } from 'pro-components-hooks'
import type { CSSProperties, ExtractPublicPropTypes, LabelHTMLAttributes, PropType, Ref } from 'vue'
import type { ValidateBehavior } from '../../props'
import type { FieldValueType } from './enums'

export const proFieldProps = {
  /**
   * 字段路径
   */
  path: String,
  /**
   * 默认值，优先级最低，用来兜底
   */
  defaultValue: undefined as any as PropType<any>,
  /**
   * 初始值，优先级大于 Form 组件的 initialValues
   */
  initialValue: undefined as any as PropType<any>,
  /**
   * 透传给表单控件的 placeholder
   */
  placeholder: [String, Array] as PropType<MaybeExpression<string | [string, string]>>,
  /**
   * 传递给表单控件的 props
   */
  fieldProps: Object as PropType<Record<string, any>>,
  /**
   * 字段被隐藏或删除时是否还保留值
   */
  preserve: {
    type: Boolean,
    default: true,
  },
  /**
   * 表单值，优先级大于 initialValue，支持表达式
   */
  value: undefined as any as PropType<any>,
  /**
   * 是否显示，支持表达式
   */
  visible: {
    type: [Boolean, String] as PropType<MaybeExpression<boolean | undefined>>,
    default: undefined,
  },
  /**
   * 是否隐藏，支持表达式
   */
  hidden: {
    type: [Boolean, String] as PropType<MaybeExpression<boolean | undefined>>,
    default: undefined,
  },
  /**
   * 字段的依赖项，当依赖项的值发生变化时，会触发校验
   */
  dependencies: [String, Object, Array] as PropType<Dependencie | Dependencie[]>,
  /**
   * 后置状态钩子，可以二次修改数据，返回的值为表单的最终结果值
   * @param val 当前表单值
   * @returns 表单结果值
   */
  postState: Function as PropType<(val: any) => any>,
  /**
   * 表单值发生变化后触发的回调函数
   * @param val 当前表单值
   */
  onChange: Function as PropType<(val: any) => void>,
  /**
   * 提交时转化值，返回为一个对象会和当前层级所在对象深度合并，返回非对象会改变原有值
   */
  transform: Function as PropType<(val: any, path: string) => any>,
  /**
   * 显示在 label 右边的提示
   */
  tooltip: [String, Array] as PropType<MaybeExpression<string | string[]>>,
  /**
   * 是否为列表，会根据此字段判断使用 createField 还是 createArrayField
   */
  isList: {
    type: Boolean,
    default: undefined,
  },
  /**
   * 用于表示值的类型是属于哪个组件的
   */
  valueType: String as PropType<MaybeExpression<FieldValueType>>,
  /**
   * 用于 v-model:xxx 的名称，默认为 'value'，用于支持 'v-model:value'
   */
  valueModelName: {
    type: String as PropType<MaybeExpression<string>>,
    default: 'value',
  },
  /**
   * 校验行为，为 popover 时验证不通过会通过 popover 进行提示
   */
  validateBehavior: String as PropType<MaybeExpression<ValidateBehavior>>,
  /**
   * 验证不通过时传递的属性，只对 popover 生效
   */
  validateBehaviorProps: Object as PropType<MaybeExpression<PopoverProps>>,
  /**
   * 精简模式，不包装 formItem
   */
  simple: {
    type: [Boolean, String] as PropType<MaybeExpression<boolean>>,
    default: false,
  },
  /**
   * 是否只读
   */
  readonly: {
    type: [Boolean, String] as PropType<MaybeExpression<boolean>>,
    default: undefined,
  },
  /**
   * 表单项前缀
   */
  addonBefore: String as PropType<MaybeExpression<string>>,
  /**
   * 表单项后缀
   */
  addonAfter: String as PropType<MaybeExpression<string>>,
  /**
   * 手动更新值
   * @param fieldValue 表单值
   * @param inputValue 输入值
   */
  onInputValue: Function as PropType<(fieldValue: Ref<any>, inputValue: any, ...args: any[]) => void>,
  /**
   * --------NFormItem 的 props-----------
   */
  label: String as PropType<MaybeExpression<string>>,
  title: String as PropType<MaybeExpression<string>>, // 同 label，为了工程化统一
  rulePath: String as PropType<MaybeExpression<string>>,
  feedback: String as PropType<MaybeExpression<string>>,
  feedbackClass: String as PropType<MaybeExpression<string>>,
  first: [Boolean, String] as PropType<MaybeExpression<boolean>>,
  required: [Boolean, String] as PropType<MaybeExpression<boolean>>,
  labelPlacement: String as PropType<MaybeExpression<'left' | 'top'>>,
  labelProps: [Object] as PropType<MaybeExpression<LabelHTMLAttributes>>,
  size: String as PropType<MaybeExpression<'small' | 'medium' | 'large'>>,
  ignorePathChange: [Boolean, String] as PropType<MaybeExpression<boolean>>,
  labelWidth: [Number, String] as PropType<MaybeExpression<string | number>>,
  labelAlign: String as PropType<MaybeExpression<'left' | 'center' | 'right'>>,
  rule: [Object, Array] as PropType<MaybeExpression<FormItemRule | FormItemRule[]>>,
  labelStyle: [String, Object] as PropType<MaybeExpression<CSSProperties | string>>,
  feedbackStyle: [String, Object] as PropType<MaybeExpression<CSSProperties | string>>,
  validationStatus: String as PropType<MaybeExpression<'error' | 'warning' | 'success'>>,
  requireMarkPlacement: String as PropType<MaybeExpression<'left' | 'right' | 'right-hanging'>>,
  showRequireMark: {
    type: [Boolean, String] as PropType<MaybeExpression<boolean | undefined>>,
    default: undefined,
  },
  showFeedback: {
    type: [Boolean, String] as PropType<MaybeExpression<boolean | undefined>>,
    default: undefined,
  },
  showLabel: {
    type: [Boolean, String] as PropType<MaybeExpression<boolean | undefined>>,
    default: undefined,
  },
  /**
   * --------NFormItem 的 props-----------
   */
} as const

export type ProFieldProps = ExtractPublicPropTypes<typeof proFieldProps>
