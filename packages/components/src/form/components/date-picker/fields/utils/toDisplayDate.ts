import { format, isDate } from 'date-fns'
import { isArray, isNumber, isString } from 'lodash-es'

export function toDisplayDate(value: any, pattern: string): string | string[] | null {
  if (isString(value)) {
    if (/^\d+$/.test(value)) {
      return format(Number(value), pattern)
    }
    return value
  }
  if (isDate(value) || isNumber(value)) {
    return format(value, pattern)
  }
  if (isArray(value)) {
    const [s, e] = value
    return [
      toDisplayDate(s, pattern),
      toDisplayDate(e, pattern),
    ].filter(Boolean) as string[]
  }
  return null
}
