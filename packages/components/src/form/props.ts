import type { ExtractPublicPropTypes, PropType } from 'vue'
import { omit } from 'lodash-es'
import { formProps } from 'naive-ui'
import type { ArrayField, BaseField, MaybeExpression } from 'pro-components-hooks'

interface ValidateError {
  message?: string
  fieldValue?: any
  field?: string
}

export const proFormExtendProps = {
  /**
   * 表单是否切换为禁用状态
   * 支持表达式
   */
  disabled: {
    type: [Boolean, String] as PropType<MaybeExpression<boolean>>,
    default: false,
  },
  /**
   * 表单是否切换为只读状态，优先级低于 ProFormItem 的 readonly
   * 支持表达式
   */
  readonly: {
    type: [Boolean, String] as PropType<MaybeExpression<boolean>>,
    default: undefined,
  },
  /**
   * 表单初始值
   */
  initialValues: Object,
  /**
   * 数据验证成功后回调事件
   */
  onSubmit: Function as PropType<(values: Record<string, any>, warnings: ValidateError[][]) => void>,
  /**
   * 数据验证失败后回调事件
   */
  onSubmitFailed: Function as PropType<(errors: ValidateError[][]) => void>,
  /**
   * 字段值发生变化时触发的回调函数
   */
  onFieldValueChange: {
    type: Function as PropType<(opt: {
      field: BaseField | ArrayField
      value: any
    }) => void>,
  },
  /**
   * 依赖项的值发生变化时触发的回调函数
   */
  onDependenciesValueChange: {
    type: Function as PropType<(opt: {
      path: string[]
      depPath: string[]
      value: any
    }) => void>,
  },
} as const

export const proFormProps = {
  /**
   * 继承原来的属性
   * 剔除 model, 表单值内部管理
   * 剔除 rules, 校验规则内部自动生成或在 pro-form-item 上书写
   * 剔除 disabled，重写属性，支持表达式
   */
  ...omit(formProps, ['model', 'disabled', 'rules']),
  ...proFormExtendProps,
} as const

export type ProFormProps = ExtractPublicPropTypes<typeof proFormProps>
export type ProFormExtendProps = ExtractPublicPropTypes<typeof proFormExtendProps>
