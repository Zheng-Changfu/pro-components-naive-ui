import type { ProEditDataTableBaseColumn } from '../../types'
import { isExpandColumn, isGroupColumn, isIndexColumn, isSelectionColumn } from '../../../data-table/utils/column'

export function isProEditDataTableBaseColumn(val: any, childrenKey = 'children'): val is ProEditDataTableBaseColumn {
  return !isIndexColumn(val) && !isExpandColumn(val) && !isSelectionColumn(val) && !isGroupColumn(val, childrenKey)
}
