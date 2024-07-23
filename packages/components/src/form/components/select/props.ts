import type { SelectProps } from 'naive-ui'
import type { ExtractPublicPropTypes, PropType } from 'vue'
import type { MaybeExpression } from 'pro-components-hooks'
import { proFormItemProps } from '../../form-item'
import { proFieldProps } from '../../field'
import type { UseInternalRequestOptions } from '../_internal/useInternalRequest'
import type { ExtendPublicProps } from '../../../types'

/**
 * 只在 remote:true 时生效
 */
interface FetchRemoteConfig {
  /**
   * 防抖时间，单位 ms
   * @default 500
   */
  debounceTime?: number
}

export const proSelectProps = {
  /**
   * 继承属性
   */
  ...proFormItemProps,
  /**
   * 额外的字段属性
   */
  ...proFieldProps,
  /**
   * 请求配置
   */
  fetchConfig: {
    type: Object as PropType<MaybeExpression<UseInternalRequestOptions> & FetchRemoteConfig>,
    default: () => ({}),
  },
  /**
   * 透传给表单，支持表达式
   */
  placeholder: {
    type: String as PropType<MaybeExpression<string>>,
  },
  fieldProps: {
    type: Object as PropType<MaybeExpression<ExtendPublicProps<Omit<
    SelectProps,
    | 'value'
    | 'placeholder'
    | 'onUpdateValue'
    | 'onUpdate:value'
    | 'defaultValue'
    >>>>,
    default: () => ({}),
  },
} as const

export type ProSelectProps = ExtractPublicPropTypes<typeof proSelectProps>
