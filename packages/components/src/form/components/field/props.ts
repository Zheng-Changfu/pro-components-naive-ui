import type { PopoverProps } from 'naive-ui'
import type { Dependencie } from 'pro-composables'
import type { TupleToUnion } from 'type-fest'
import type { ExtractPublicPropTypes, PropType, Ref } from 'vue'
import type { ValidateBehavior } from '../../props'
import type { InternalFieldValueType } from './enums'
import { simplyOmit } from '../../../_utils/simplyOmit'
import { proFormItemProps } from '../form-item'

export const proFieldProps = {
  ...proFormItemProps,
  /**
   * 初始值，优先级大于 Form 组件的 initialValues
   */
  initialValue: undefined as any as PropType<any>,
  /**
   * 透传给表单控件的 placeholder
   */
  placeholder: [String, Array] as PropType<string | [string, string]>,
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
   * 表单值，优先级大于 initialValue
   */
  value: undefined as any as PropType<any>,
  /**
   * 是否显示
   */
  visible: {
    type: Boolean,
    default: undefined,
  },
  /**
   * 是否隐藏
   */
  hidden: {
    type: Boolean,
    default: undefined,
  },
  /**
   * 字段的依赖项，当依赖项的值发生变化时，会触发校验
   */
  dependencies: [String, Function, RegExp, Array] as PropType<Dependencie | Dependencie[]>,
  /**
   * 后置状态钩子，可以二次修改数据，返回的值为表单的最终结果值
   * @param val 当前表单值
   * @returns 表单结果值
   */
  postValue: Function as PropType<(val: any) => any>,
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
   * 是否为列表，会根据此字段判断使用 createField 还是 createArrayField
   */
  isList: {
    type: Boolean,
    default: undefined,
  },
  /**
   * 用于表示值的类型是属于哪个组件的
   */
  valueType: String as PropType<InternalFieldValueType>,
  /**
   * 用于 v-model:xxx 的名称，默认为 'value'，用于支持 'v-model:value'
   */
  valueModelName: {
    type: String,
    default: 'value',
  },
  /**
   * 校验行为，为 popover 时验证不通过会通过 popover 进行提示
   */
  validateBehavior: String as PropType<ValidateBehavior>,
  /**
   * 验证不通过时传递的属性，只对 popover 生效
   */
  validateBehaviorProps: Object as PropType<PopoverProps>,
  /**
   * 精简模式，不包装 formItem
   */
  simple: Boolean,
  /**
   * 是否只读
   */
  readonly: {
    type: Boolean,
    default: undefined,
  },
  /**
   * 手动更新值
   * @param fieldValue 表单值
   * @param inputValue 输入值
   */
  onInputValue: Function as PropType<(fieldValue: Ref<any>, inputValue: any, ...args: any[]) => void>,
} as const

/**
 * 所有的非列表表单项应该共享的，例如 pro-input 等
 */
const proFieldIgnoreKeys = [
  'isList',
  'valueType',
  'fieldProps',
  'valueModelName',
] as const

export const proFieldSharedProps = {
  ...simplyOmit(
    proFieldProps,
    proFieldIgnoreKeys as any,
  ) as Omit<typeof proFieldProps, TupleToUnion<typeof proFieldIgnoreKeys>>,
} as const

/**
 * 所有的列表表单项应该共享的，例如 pro-form-list 等
 */
const proListFieldIgnoreKeys = [
  'simple',
  'isList',
  'onChange',
  'postValue',
  'valueType',
  'fieldProps',
  'placeholder',
  'onInputValue',
  'valueModelName',
] as const

export const proListFieldSharedProps = {
  ...simplyOmit(
    proFieldProps,
    proListFieldIgnoreKeys as any,
  ) as Omit<typeof proFieldProps, TupleToUnion<typeof proListFieldIgnoreKeys>>,
}

export type ProFieldProps = ExtractPublicPropTypes<typeof proFieldProps>
export type ProFieldSharedProps = ExtractPublicPropTypes<typeof proFieldSharedProps>
export type ProListFieldSharedProps = ExtractPublicPropTypes<typeof proListFieldSharedProps>
