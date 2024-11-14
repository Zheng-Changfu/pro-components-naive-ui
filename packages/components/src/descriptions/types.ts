import type { DescriptionItemProps } from 'naive-ui'
import type { VNodeChild } from 'vue'
import type { ProFieldColumn } from '../form'

interface ProDescriptionColumnProps<DataSource = any> extends Omit<DescriptionItemProps, 'label'> {
  /**
   * title 右边的提示
   */
  tooltip?: string | string[]
  /**
   * 同 label
   */
  title?: string | (() => VNodeChild)
  /**
   * 标题
   */
  label?: string | (() => VNodeChild)
  /**
   * 当 valueType 不满足需求时，可以自定义渲染
   * @param dataSource 数据源
   */
  render?: (dataSource: DataSource) => VNodeChild
}

export type ProDescriptionColumn<DataSource = any> = ProFieldColumn<
  DataSource,
  ProDescriptionColumnProps<DataSource>,
  [DataSource],
  [DataSource]
>

export type ProDescriptionColumns<DataSource = any> = Array<ProDescriptionColumn<DataSource>>
