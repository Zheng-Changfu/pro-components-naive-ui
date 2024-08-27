import type { ExtractPublicPropTypes, PropType } from 'vue'
import { descriptionsProps } from 'naive-ui'
import type { AnyFn } from '../types'
import type { ProDescriptionColumns, RefreshOnWindowFocus } from './types'

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
  manual: {
    type: Boolean,
    default: false,
  },
  /**
   * 屏幕聚焦刷新请求
   */
  refreshOnWindowFocus: {
    type: [Boolean, Object] as PropType<RefreshOnWindowFocus>,
    default: undefined,
  },
  /**
   * 是否接收路由的 query 和 params 参数作为请求参数
   */
  receiveRouteQueryParams: {
    type: Boolean,
    default: undefined,
  },
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
