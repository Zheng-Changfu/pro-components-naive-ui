import type { TransferOption, TransferProps } from 'naive-ui'
import type { ExtractPublicPropTypes, PropType } from 'vue'
import type { BaseFieldProps } from '../../../types'
import { proFieldProps } from '../field'

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
  fieldProps: Object as PropType<BaseFieldProps<ProTransferFieldProps>>,
} as const

export type ProTransferProps = ExtractPublicPropTypes<typeof proTransferProps>
