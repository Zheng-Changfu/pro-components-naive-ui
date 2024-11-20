import type { PopoverProps } from 'naive-ui'
import type { ExtractPublicPropTypes, PropType } from 'vue'
import type { CreateProFormReturn } from './composables/createProForm'
import { omit } from 'lodash-es'
import { formProps } from 'naive-ui'

export interface ValidateError {
  message?: string
  fieldValue?: any
  field?: string
}

export type ValidateBehavior = 'default' | 'popover'
export type ValidationTrigger = 'input' | 'change' | 'blur' | 'focus' | ({} & string)

export const proFormExtendProps = {
  /**
   * 表单控制器
   */
  form: {
    type: Object as PropType<CreateProFormReturn>,
    required: true,
  },
  /**
   * 表单项只读模式下的文字
   */
  readonlyEmptyText: {
    type: String,
    default: '-',
  },
  /**
   * 表单验证时机
   */
  validationTrigger: {
    type: [String, Array] as PropType<ValidationTrigger | ValidationTrigger[]>,
    default: 'input',
  },
  /**
   * 是否为只读状态，优先级低于 ProField 的 readonly
   */
  readonly: {
    type: Boolean,
    default: undefined,
  },
  /**
   * 校验行为，为 popover 时验证不通过会通过 popover 进行提示
   */
  validateBehavior: String as PropType<ValidateBehavior>,
  /**
   * 验证不通过时传递的属性，只对 popover 生效
   */
  validateBehaviorProps: Object as PropType<PopoverProps>,
} as const

export const proFormProps = {
  /**
   * 继承原来的属性
   * 剔除 model, 表单值内部管理
   * 剔除 rules, 校验规则内部自动生成或在 ProField 上书写
   */
  ...omit(formProps, ['model', 'rules']),
  ...proFormExtendProps,
} as const

export type ProFormProps = ExtractPublicPropTypes<typeof proFormProps>
export type ProFormExtendProps = ExtractPublicPropTypes<typeof proFormExtendProps>
