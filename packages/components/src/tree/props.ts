import type { SpinProps } from 'naive-ui'
import { treeProps } from 'naive-ui'
import type { ExtractPublicPropTypes, PropType } from 'vue'
import type { UseRequestOptions } from 'pro-components-hooks'
import { omit } from 'lodash-es'

export const proTreeExtendProps = {
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
  /**
   * loading 组件属性
   */
  spinProps: {
    type: Object as PropType<SpinProps>,
    default: () => ({}),
  },
} as const

export const proTreeProps = {
  ...omit(treeProps, [
    'defaultExpandAll',
    'defaultCheckedKeys',
    'defaultExpandedKeys',
    'defaultSelectedKeys',
  ]),
  ...proTreeExtendProps,
} as const

export type ProTreeProps = ExtractPublicPropTypes<typeof proTreeProps>
export type ProTreeExtendProps = ExtractPublicPropTypes<typeof proTreeExtendProps>
