import type { ExtractObjectPath } from 'pro-components-hooks'
import type { VNodeChild } from 'vue'
import type { GridItemProps } from 'naive-ui'
import type { FieldValueType, ProFieldProps } from '../../../form'
import type { AnyFn } from '../../../types'

export interface ProSearchFormColumn<DataSource = any> extends Pick<GridItemProps, 'span' | 'offset'>, Omit<ProFieldProps, 'path' | 'defaultValue' | 'isList' | 'valueType' | 'valueModelName' > {
  /**
   * 字段路径
   */
  path?: ExtractObjectPath<DataSource>
  /**
   * 组件映射，需要通过 `ProConfigProvider` 的 `valueTypeMap` 映射
   */
  valueType?: FieldValueType
  /**
   * 当 valueType 不满足需求时，可以自定义渲染
   */
  render?: () => VNodeChild
  /**
   * 组件的 slots，自定义渲染时无效
   */
  slots?: Record<string, AnyFn>
}

export type ProSearchFormColumns<DataSource = any> = ProSearchFormColumn<DataSource>[]
