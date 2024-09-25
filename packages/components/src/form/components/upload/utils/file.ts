import type { UploadFileInfo } from 'naive-ui'
import { isArray, isString } from 'lodash-es'
import { uid } from 'pro-components-hooks'
import { isEmptyValue } from '../../field/utils/valueUtil'

/**
 * 自动生成 id
 * 支持文件 url 组成的 fileList 回显
 */
export function convertValueToFile(val: any, postValue?: (val: any) => any): UploadFileInfo[] {
  if (isEmptyValue(val)) {
    return postValue ? postValue(val) : []
  }
  if (!isArray(val)) {
    val = [val].filter(Boolean)
  }
  const fileList = val.map((file: any) => {
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
  return postValue ? postValue(fileList) : fileList
}
