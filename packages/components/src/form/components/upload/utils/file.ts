import type { UploadFileInfo } from 'naive-ui'
import { isArray, isString } from 'lodash-es'
import { uid } from 'pro-components-hooks'
import { isEmptyValue } from '../../field/utils/valueUtil'

/**
 * 自动生成 id
 * 支持文件 url 组成的 fileList 回显
 */
export function convertValueToFile(val: any, postState?: (val: any) => any): UploadFileInfo[] {
  if (postState) {
    return postState(val) ?? []
  }
  if (isEmptyValue(val)) {
    return []
  }
  if (!isArray(val)) {
    val = [val].filter(Boolean)
  }
  return val.map((file: any) => {
    if (isString(file)) {
      return {
        id: uid(),
        url: file,
        name: file,
        status: 'finished',
      }
    }
    return {
      id: uid(),
      ...file,
    }
  })
}
