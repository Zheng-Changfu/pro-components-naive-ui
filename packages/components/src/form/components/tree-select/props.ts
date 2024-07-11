import type { TreeSelectProps } from 'naive-ui'
import type { ExtractPublicPropTypes, PropType } from 'vue'
import type { MaybeExpression, UseRequestOptions } from 'pro-components-hooks'
import { proFormItemProps } from '../../form-item'
import { proFieldProps } from '../../field'

export interface ProTreeSelectFieldProps extends TreeSelectProps {
  /**
   * 替代 TreeOption 中的 isLeaf 字段
   * @default 'isLeaf'
   */
  leafField: string
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
   * 是否过滤掉空子节点字段（空数组或者 undefined/null）
   * @default true
   */
  filterEmptyChildrenField: boolean
  /**
   * 请求成功后是否展开全部节点（搭配 fetchConfig）
   * @default false
   */
  expandAllOnFetchSuccess: boolean
}

/**
 * 只在 remote:true 时生效
 */
interface FetchRemoteConfig {
  /**
   * 防抖时间，单位 ms
   * @default '500'
   */
  debounceTime?: number
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
    type: Object as PropType<UseRequestOptions<any, any> & FetchRemoteConfig>,
    default: () => ({}),
  },
  /**
   * 透传给表单，支持表达式
   */
  placeholder: {
    type: String as PropType<MaybeExpression<string>>,
  },
  fieldProps: {
    type: Object as PropType<MaybeExpression<Omit<
    ProTreeSelectFieldProps,
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
