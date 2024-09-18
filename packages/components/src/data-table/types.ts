import type { TableBaseColumn, TableColumnGroup, TableExpandColumn, TableSelectionColumn } from 'naive-ui/es/data-table/src/interface'
import type { ExtractObjectPath } from 'pro-components-hooks'

interface ProTableBaseColumn<RowData = any> extends Omit<TableBaseColumn<RowData>, 'key'> {
  key?: ExtractObjectPath<RowData> | ({} & string)
  path: ExtractObjectPath<RowData> | ({} & string)
}

interface ProTableColumnGroup<RowData = any> extends Omit<TableColumnGroup<RowData>, 'key' | 'children'> {
  key?: ExtractObjectPath<RowData> | ({} & string)
  path: ExtractObjectPath<RowData> | ({} & string)
  children: ProTableBaseColumn<RowData>[]
}

export type ProDataTableColumn<RowData = any> =
  | ProTableColumnGroup<RowData>
  | ProTableBaseColumn<RowData>
  | TableSelectionColumn<RowData>
  | TableExpandColumn<RowData>

export type ProDataTableColumns<RowData = any> = ProDataTableColumn<RowData>[]
