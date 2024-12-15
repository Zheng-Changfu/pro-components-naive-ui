import { isArray, isString } from 'lodash-es'

/**
 * 支持字符串、字符串数组
 */
export function transformValueToSrcs(value: any) {
  const list = isArray(value) ? value : [value]
  return list.reduce<string[]>((p, c) => {
    if (isString(c) && c.length > 0) {
      p.push(c)
    }
    return p
  }, [])
}
