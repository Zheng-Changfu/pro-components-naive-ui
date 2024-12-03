import type { ProEditDataTableBaseColumn } from '../../types'
import { isBaseColumn } from '../../../data-table/utils/column'

export function isProEditDataTableBaseColumn(val: any, childrenKey = 'children'): val is ProEditDataTableBaseColumn {
  return isBaseColumn(val, childrenKey) as any
}
