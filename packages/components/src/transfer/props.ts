import type { TransferOption, TransferProps } from 'naive-ui'
import type { ExtractPublicPropTypes, PropType } from 'vue'
import type { MaybeExpression } from 'pro-components-hooks'
import { proFieldProps, proFormItemProps } from '../form'

interface ProTransferFieldProps extends Omit<TransferProps, 'value' | 'onUpdateValue' | 'onUpdate:value' | 'defaultValue' | 'sourceFilterPlaceholder' | 'targetFilterPlaceholder'> {
  /**
   * 选项 label 的字段名
   * @default 'label'
   */
  labelField?: string
  /**
   * 选项 value 的字段名
   * @default 'value'
   */
  valueField?: string
  /**
   * 配置选项内容
   */
  options?: Array<TransferOption & { x: string }>
}

export const proTransferProps = {
  /**
   * 继承属性
   */
  ...proFormItemProps,
  /**
   * 额外的字段属性
   */
  ...proFieldProps,
  /**
   * 代替 source-filter-placeholder 和 target-filter-placeholder
   */
  placeholder: {
    type: Array as PropType<MaybeExpression<string[]>>,
  },
  fieldProps: {
    type: Object as PropType<MaybeExpression<ProTransferFieldProps>>,
    default: () => ({}),
  },
} as const

export type ProTransferProps = ExtractPublicPropTypes<typeof proTransferProps>
