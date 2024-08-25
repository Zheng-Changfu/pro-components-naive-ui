import type { VNodeChild } from 'vue'
import type { DescriptionItemProps } from 'naive-ui'
import type { FieldValueType } from '../form'
import type { AnyFn } from '../types'

export type RefreshOnWindowFocus = boolean | {
  intervalTime: number
}

type InternalDataSource = Record<string, unknown>

export interface ProDescriptionColumn<T = InternalDataSource> extends Omit<DescriptionItemProps, 'label'> {
  path?: string // 这里要改
  key?: string // 唯一标识，默认内部生成 uid
  valueType?: FieldValueType
  fieldProps?: Record<string, any>
  title?: string | (() => VNodeChild)
  label?: string | (() => VNodeChild)
  render?: (dataSource: T) => VNodeChild
  slots?: Record<string, AnyFn>
}

export type ProDescriptionColumns<T = InternalDataSource> = ProDescriptionColumn<T>[]
