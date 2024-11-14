import type { ExtractPublicPropTypes, PropType } from 'vue'
import type { RefreshOnWindowFocus } from '../composables/useFetchData'
import type { AnyFn } from '../types'
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
    type: Array as PropType<ProDescriptionColumns<any>>,
  },
  /**
   * 是否在请求中
   */
  loading: {
    type: Boolean,
    default: undefined,
  },
  /**
   * 是否手动调用 request，设置后不会调用 request
   */
  manual: Boolean,
  /**
   * 屏幕聚焦刷新请求
   */
  refreshOnWindowFocus: {
    type: [Boolean, Object] as PropType<RefreshOnWindowFocus>,
    default: undefined,
  },
  /**
   * 请求成功后可以转化数据，返回值为最终的结果值
   */
  transform: Function as AnyFn,
  /**
   * 请求函数
   */
  request: Function as AnyFn,
  /**
   * 请求失败触发的函数
   */
  onRequestError: Function as AnyFn,
  /**
   * 请求成功触发的函数
   */
  onRequestSuccess: Function as AnyFn,
  /**
   * 请求结束后触发的函数
   */
  onRequestComplete: Function as AnyFn,
} as const

export const proDescriptionsProps = {
  ...descriptionsProps,
  ...proDescriptionsExtendProps,
} as const

export type ProDescriptionsProps = ExtractPublicPropTypes<typeof proDescriptionsProps>
export type ProDescriptionsExtendProps = ExtractPublicPropTypes<typeof proDescriptionsExtendProps>
