import type { TransferOption, TransferProps } from 'naive-ui'
import type { ExtractPublicPropTypes, PropType } from 'vue'
import type { MaybeExpression } from 'pro-components-hooks'
import { proFieldProps } from '../field'
import type { ExtendAttrsStyleProps } from '../../../types'

interface ProTransferFieldProps extends TransferProps {
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
  ...proFieldProps,
  fieldProps: {
    type: Object as PropType<MaybeExpression<ExtendAttrsStyleProps<ProTransferFieldProps>>>,
    default: () => ({}),
  },
} as const

export type ProTransferProps = ExtractPublicPropTypes<typeof proTransferProps>
