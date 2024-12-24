import type { ProEditDataTableBaseColumn } from '../../types'
import { isFunction, isString } from 'lodash-es'
import { isBaseColumn, isIndexColumn } from '../../../data-table/utils/column'

export function isProEditDataTableBaseColumn(val: any, childrenKey?: string, dragSortKey?: string): val is ProEditDataTableBaseColumn {
  if (isString(val.valueType) && isBaseColumn(val, childrenKey, dragSortKey)) {
    return true
  }
  if ((isFunction(val.render) && !isIndexColumn(val))) {
    return true
  }
  return false
}
