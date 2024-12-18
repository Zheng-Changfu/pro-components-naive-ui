import type { ProTagsConfig } from './types'
import { isArray, isPlainObject, isString } from 'lodash-es'

/**
 * 支持字符串、字符串数组、对象、对象数组、对象和字符串混合的数组
 */
export function transformValueToTagOptions(value: any) {
  const list = isArray(value) ? value : [value]
  return list.reduce<ProTagsConfig[]>((p, c) => {
    if (isString(c) && c.length > 0) {
      p.push({
        content: c,
        type: 'primary',
        bordered: false,
      })
    }
    if (isPlainObject(c) && isString(c.content) && c.content.length > 0) {
      p.push({
        type: 'primary',
        bordered: false,
        ...c,
      })
    }
    return p
  }, [])
}
