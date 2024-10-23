import type { PaginationProps } from 'naive-ui'
import type { MaybeExpression } from 'pro-components-hooks'
import type { ExtractPublicPropTypes } from 'vue'
import type { ProButtonProps } from '../button'
import type { ProEditDataTableColumns } from './types'
import { omit } from 'lodash-es'
import { proDataTableProps } from '../data-table'
import { proFieldProps } from '../form'

export const proEditDataTableProps = {
  /**
   * 编辑表格被 form 接管数据源，所以要删除掉一些属性
   */
  ...omit(proDataTableProps, [
    'data',
    'manual',
    'rowKey',
    'request',
    'transform',
    'onRequestError',
    'onRequestSuccess',
    'onRequestComplete',
    'refreshOnWindowFocus',
  ]),
  /**
   * 表格被包装成一个表单控件，支持表单控件的功能
   */
  ...proFieldProps,
  /**
   * 添加一行按钮显示在顶部还是底部
   *  顶部：每次添加数据都添加在首行
   *  底部：每次添加数据都添加在尾行
   * @default 'bottom'
   */
  position: String as PropType<MaybeExpression<'top' | 'bottom'>>,
  /**
   * 最多行数，多于该数则无法继续新增
   */
  max: [String, Number] as PropType<MaybeExpression<number>>,
  /**
   * 新增一行的默认值
   */
  creatorInitialValue: Function as PropType<() => Record<string, any>>,
  /**
   * 新增一行按钮的属性，false 不显示
   */
  creatorButtonProps: {
    type: [Object, Boolean] as PropType<MaybeExpression<ProButtonProps | false>>,
    default: undefined,
  },
  /**
   * 重写类型
   */
  pagination: {
    type: [Boolean, Object] as PropType<false | PaginationProps>,
    default: false,
  },
  /**
   * 重写类型
   */
  columns: Array as PropType<ProEditDataTableColumns>,
} as const

export type ProEditDataTableProps = ExtractPublicPropTypes<typeof proEditDataTableProps>
