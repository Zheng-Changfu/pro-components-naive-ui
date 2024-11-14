import type { GridItemProps } from 'naive-ui'
import type { VNodeChild } from 'vue'
import type { InternalProFieldProps, ProFieldColumn } from '../../../form'
import type { ProSearchFormInst } from './inst'

interface ProSearchFormColumnProps<Values = any> extends InternalProFieldProps, Pick<
  GridItemProps,
  | 'span' | 'offset'
> {
  /**
   * 当 valueType 不满足需求时，可以自定义渲染
   */
  render?: (action: ProSearchFormInst<Values>) => VNodeChild
}

export type ProSearchFormColumn<Values = any> = ProFieldColumn<
  Values,
  ProSearchFormColumnProps<Values>,
  [ProSearchFormInst<Values>],
  [ProSearchFormInst<Values>]
>

export type ProSearchFormColumns<Values = any> = ProSearchFormColumn<Values>[]
// TODO: getFieldValue 无类型提示
// const c: ProSearchFormColumns<{ a: 1, b: 2 }> = [
//   {
//     valueType: 'digit',
//     fieldProps(a) {
//       a.getFieldValue()
//     },
//     proFieldProps: (a: ProSearchFormInst<{
//       a: 1
//       b: 2
//     }>) => {
//       a.getFieldValue()
//       const r = a.getFieldValue('')
//       return {
//         required: '{{ 123 }}',
//       }
//     },
//   },
// ]
