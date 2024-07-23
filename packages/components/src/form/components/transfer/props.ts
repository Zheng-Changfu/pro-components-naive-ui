import type { SpinProps, TransferOption, TransferProps } from 'naive-ui'
import type { ExtractPublicPropTypes, PropType } from 'vue'
import type { MaybeExpression } from 'pro-components-hooks'
import { proFormItemProps } from '../../form-item'
import { proFieldProps } from '../../field'
import type { UseInternalRequestOptions } from '../_internal/useInternalRequest'
import type { ExtendPublicProps } from '../../../types'

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
  /**
   * 继承属性
   */
  ...proFormItemProps,
  /**
   * 额外的字段属性
   */
  ...proFieldProps,
  /**
   * loading 组件属性
   */
  spinProps: {
    type: Object as PropType<SpinProps>,
    default: () => ({}),
  },
  /**
   * 请求配置
   */
  fetchConfig: {
    type: Object as PropType<MaybeExpression<UseInternalRequestOptions>>,
    default: () => ({}),
  },
  /**
   * 代替 source-filter-placeholder 和 target-filter-placeholder
   */
  placeholder: {
    type: Array as PropType<MaybeExpression<string[]>>,
  },
  fieldProps: {
    type: Object as PropType<MaybeExpression<ExtendPublicProps<Omit<
    ProTransferFieldProps,
    | 'value'
    | 'defaultValue'
    | 'onUpdateValue'
    | 'onUpdate:value'
    | 'sourceFilterPlaceholder'
    | 'targetFilterPlaceholder'
    >>>>,
    default: () => ({}),
  },
} as const

export type ProTransferProps = ExtractPublicPropTypes<typeof proTransferProps>
