import type { ExtractPublicPropTypes, PropType } from 'vue'
import type { ProButtonProps } from '../button'
import type { ProDataTableProps } from '../data-table'
import type { ActionGuard, ProEditDataTableColumns } from './types'
import { omit, pick } from 'lodash-es'
import { proDataTableProps } from '../data-table'
import { proFieldProps } from '../form'

console.log(
  pick(proDataTableProps, Object.keys(proFieldProps)),
  pick(proFieldProps, Object.keys(proDataTableProps)),
)
export const proEditDataTableProps = {
  /**
   * 编辑表格被 form 接管数据源
   */
  ...omit(proDataTableProps, [
    'data',
  ]),
  /**
   * 表格被包装成一个表单控件，支持表单控件的功能
   */
  ...proFieldProps,
  /**
   * 最多行数，多于该数则无法继续新增
   */
  max: Number,
  /**
   * 新增一行的默认值
   */
  creatorInitialValue: Function as PropType<() => Record<string, any>>,
  /**
   * 新增一行按钮的属性，false 不显示
   */
  creatorButtonProps: {
    type: [Object, Boolean] as PropType<ProButtonProps | false>,
    default: undefined,
  },
  /**
   * 操作拦截器
   */
  actionGuard: Object as PropType<ActionGuard>,
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
    type: Object as PropType<Partial<{
      size: ProDataTableProps['size'] & {}
      title: ProDataTableProps['title'] & {}
      tooltip: ProDataTableProps['tooltip'] & {}
    }>>,
    default: () => ({}),
  },
} as const

export type ProEditDataTableProps = ExtractPublicPropTypes<typeof proEditDataTableProps>
