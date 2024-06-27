import type { TreeSelectProps } from 'naive-ui'
import type { ExtractPublicPropTypes, PropType } from 'vue'
import type { MaybeExpression, UseRequestOptions } from 'pro-components-hooks'
import { proFieldProps, proFormItemProps } from '../form'

export const proTreeSelectExtendProps = {
  /**
   * 替代 TreeOption 中的 isLeaf 字段
   */
  leafField: {
    type: String,
    default: 'isLeaf',
  },
  /**
   * 是否为异步加载，搭配 fetchConfig 使用
   * @default false
   */
  remote: {
    type: Boolean,
    default: false,
  },
  /**
   * 空子节点是否当成叶子节点（空数组或者 undefined/null），在异步模式下生效
   * @default true
   */
  emptyChildrenConsideredLeafNode: {
    type: Boolean,
    default: true,
  },
  /**
   * 是否过滤掉空子节点字段（空数组或者 undefined/null）
   * @default true
   */
  filterEmptyChildrenField: {
    type: Boolean,
    default: true,
  },
  /**
   * 请求成功后是否展开全部节点（搭配 fetchConfig）
   * @default false
   */
  expandAllOnFetchSuccess: {
    type: Boolean,
    default: false,
  },
  /**
   * 请求配置
   */
  fetchConfig: {
    type: Object as PropType<UseRequestOptions<any, any>>,
    default: () => ({}),
  },
} as const

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
   * 扩展的属性
   */
  ...proTreeSelectExtendProps,
  /**
   * 透传给表单，支持表达式
   */
  placeholder: {
    type: String as PropType<MaybeExpression<string>>,
  },
  fieldProps: {
    type: Object as PropType<MaybeExpression<Omit<
    TreeSelectProps,
    | 'value'
    | 'placeholder'
    | 'defaultValue'
    | 'defaultExpandAll'
    | 'defaultExpandedKeys'
    | 'onUpdateValue'
    | 'onUpdate:value'
    >>>,
    default: () => ({}),
  },
} as const

export type ProTreeSelectProps = ExtractPublicPropTypes<typeof proTreeSelectProps>
export type ProTreeSelectExtendProps = ExtractPublicPropTypes<typeof proTreeSelectExtendProps>
