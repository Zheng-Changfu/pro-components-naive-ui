import { isString, toString } from 'lodash-es'

export function transformValueToString(value: any) {
  return isString(value) ? value : toString(value)
}
