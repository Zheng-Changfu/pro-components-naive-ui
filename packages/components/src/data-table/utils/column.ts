import type { TableSelectionColumn } from 'naive-ui/es/data-table/src/interface'
import type { ProDataTableBaseColumn, ProDataTableColumnGroup, ProDataTableExpandColumn, ProDataTableIndexColumn } from '../types'
import { get, isArray } from 'lodash-es'

export function isIndexColumn(val: any): val is ProDataTableIndexColumn {
  return val.type === 'index'
}

export function isExpandColumn(val: any): val is ProDataTableExpandColumn {
  return val.type === 'expand'
}

export function isSelectionColumn(val: any): val is TableSelectionColumn {
  return val.type === 'selection'
}

export function isGroupColumn(val: any, childrenKey = 'children'): val is ProDataTableColumnGroup {
  return isArray(get(val, childrenKey))
}

export function isBaseColumn(val: any, childrenKey = 'children'): val is ProDataTableBaseColumn {
  return !isIndexColumn(val) && !isExpandColumn(val) && !isSelectionColumn(val) && !isGroupColumn(val, childrenKey)
}
