import dayjs from 'dayjs'
import { isString } from 'lodash-es'
import { isEmptyValue } from '../../field/utils/valueUtil'

export function convertStringToTimestamp(val: any, postState?: (val: any) => any) {
  if (postState) {
    return postState(val) ?? null
  }
  if (isEmptyValue(val)) {
    return null
  }
  if (isString(val)) {
    return dayjs(val).valueOf()
  }
  return val
}

export function convertStringArrayToTimestampArray(val: any, postState?: (val: any) => any) {
  if (postState) {
    return postState(val) ?? null
  }
  if (isEmptyValue(val)) {
    return null
  }
  let [s, e] = val ?? []
  s = convertStringToTimestamp(s)
  e = convertStringToTimestamp(e)
  const r = [s, e].filter(Boolean)
  return r.length > 0 ? r : null
}
