import type { GridItemProps } from 'naive-ui'
import type { VNodeChild } from 'vue'
import type { ProFieldColumn, ProFieldSharedProps } from '../form'

interface ProSearchFormColumnProps extends ProFieldSharedProps, Pick<
  GridItemProps,
  | 'span'
  | 'offset'
> {
  /**
   * 当 valueType 不满足需求时，可以自定义渲染
   */
  render?: () => VNodeChild
}

export type ProSearchFormColumn<Values = any> = ProFieldColumn<
  Values,
  ProSearchFormColumnProps
>

export type ProSearchFormColumns<Values = any> = ProSearchFormColumn<Values>[]
