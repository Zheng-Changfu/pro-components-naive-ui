import { isArray, isString } from 'lodash-es'

export function isEmptyValue(value: any) {
  if (value === null || value === undefined) {
    return true
  }
  if (isArray(value) && !value.filter(Boolean).length) {
    return true
  }
  if (isString(value) && !value) {
    return true
  }
  return false
}
