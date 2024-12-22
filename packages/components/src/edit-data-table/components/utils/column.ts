import type { ProEditDataTableBaseColumn } from '../../types'
import { isFunction, isString } from 'lodash-es'
import { isBaseColumn } from '../../../data-table/utils/column'

export function isProEditDataTableBaseColumn(val: any, childrenKey?: string, dragSortKey?: string): val is ProEditDataTableBaseColumn {
  return (isBaseColumn(val, childrenKey, dragSortKey) && isString(val.valueType)) || isFunction(val.render)
}
