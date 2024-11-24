import type { ExtractPublicPropTypes, PropType } from 'vue'
import type { ProDescriptionColumns } from './types'
import { descriptionsProps } from 'naive-ui'

export const proDescriptionsExtendProps = {
  /**
   * 数据源
   */
  data: Object as PropType<any>,
  /**
   * DescriptionItems
   */
  columns: {
    type: Array as PropType<ProDescriptionColumns>,
  },
} as const

export const proDescriptionsProps = {
  ...descriptionsProps,
  ...proDescriptionsExtendProps,
} as const

export type ProDescriptionsProps = ExtractPublicPropTypes<typeof proDescriptionsProps>
export type ProDescriptionsExtendProps = ExtractPublicPropTypes<typeof proDescriptionsExtendProps>
