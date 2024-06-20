import type { TreeSelectProps } from 'naive-ui'
import type { ExtractPublicPropTypes, PropType } from 'vue'
import type { MaybeExpression, UseRequestOptions } from 'pro-components-hooks'
import { proFieldProps, proFormItemProps } from '../form'

interface ProTreeSelectFieldProps extends Omit<
TreeSelectProps,
| 'value'
| 'placeholder'
| 'defaultValue'
| 'onUpdateValue'
| 'onUpdate:value'
> {
  /**
   * 是否为异步加载，搭配 fetchConfig 使用
   * @default false
   */
  remote: boolean
  /**
   * 空子节点是否当成叶子节点（空数组或者 undefined/null），在异步模式下生效
   * @default true
   */
  emptyChildrenConsideredLeafNode: boolean
  /**
   * 是否过滤掉空子节点字段（空数组或者 undefined/null），在非异步模式下生效
   * @default true
   */
  filterEmptyChildrenField: boolean
}

export const proTreeSelectProps = {
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
    type: Object as PropType<UseRequestOptions<any, any>>,
    default: () => ({}),
  },
  /**
   * 透传给表单，支持表达式
   */
  placeholder: {
    type: String as PropType<MaybeExpression<string>>,
  },
  fieldProps: {
    type: Object as PropType<MaybeExpression<ProTreeSelectFieldProps>>,
    default: () => ({}),
  },
} as const

export type ProTreeSelectProps = ExtractPublicPropTypes<typeof proTreeSelectProps>
