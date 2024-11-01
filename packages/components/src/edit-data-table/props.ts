import type { PaginationProps } from 'naive-ui'
import type { MaybeExpression } from 'pro-components-hooks'
import type { ExtractPublicPropTypes, PropType } from 'vue'
import type { ProButtonProps } from '../button'
import type { ProDataTableProps } from '../data-table'
import type { ExtendAttrsStyleProps } from '../types'
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
  /**
   * 这些属性有冲突
   * @example
   * ```vue
   * <pro-edit-data-table
   *   :title="formItem 标题"
   *   :field-props="{
   *      title:"表格标题"
   *   }"
   *  />
   * ```
   */
  fieldProps: {
    type: Object as PropType<MaybeExpression<ExtendAttrsStyleProps<Partial<{
      size: ProDataTableProps['size'] & {}
      title: ProDataTableProps['title'] & {}
      tooltip: ProDataTableProps['tooltip'] & {}
    }>>>>,
    default: () => ({}),
  },
} as const

export type ProEditDataTableProps = ExtractPublicPropTypes<typeof proEditDataTableProps>
