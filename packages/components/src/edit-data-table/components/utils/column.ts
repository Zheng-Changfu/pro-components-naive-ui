import type { ProEditDataTableBaseColumn } from '../../types'
import { isString } from 'lodash-es'

export function isProEditDataTableBaseColumn(val: any): val is ProEditDataTableBaseColumn {
  return isString(val.valueType) || val.render
}
