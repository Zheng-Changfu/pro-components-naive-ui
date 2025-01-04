import type { ExtractPublicPropTypes, PropType } from 'vue'
import type { CreateProFormReturn } from './composables/createProForm'
import { formProps } from 'naive-ui'
import { keysOf } from '../_utils/keysOf'
import { simplyOmit } from '../_utils/simplyOmit'

export interface ValidateError {
  message?: string
  fieldValue?: any
  field?: string
}

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
   * 表单是否在 loading 中
   */
  loading: Boolean,
  /**
   * 是否在按下回车后提交
   */
  submitOnPressEnter: Boolean,
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
} as const

export const proFormProps = {
  /**
   * 继承原来的属性
   * 剔除 model, 表单值内部管理
   */
  ...simplyOmit(formProps, [
    'model',
  ]),
  ...proFormExtendProps,
} as const

export const proFormPropKeys = keysOf(proFormProps)
export type ProFormProps = ExtractPublicPropTypes<typeof proFormProps>
export type ProFormExtendProps = ExtractPublicPropTypes<typeof proFormExtendProps>
