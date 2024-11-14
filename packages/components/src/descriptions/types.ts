import type { DescriptionItemProps } from 'naive-ui'
import type { ExtractObjectPath } from 'pro-components-hooks'
import type { VNodeChild } from 'vue'
import type { InternalFieldValueType } from '../form'
import type { AnyFn } from '../types'

type InternalDataSource = Record<string, unknown>

export interface ProDescriptionColumn<T = InternalDataSource> extends Omit<DescriptionItemProps, 'label'> {
  /**
   * 字段路径
   */
  path?: ExtractObjectPath<T>
  /**
   * title 右边的提示
   */
  tooltip?: string | string[]
  /**
   * 唯一标识，默认内部生成 uid
   */
  key?: string
  /**
   * 组件映射，需要通过 `ProConfigProvider` 的 `valueTypeMap` 映射
   */
  valueType?: InternalFieldValueType
  /**
   * 组件的 props，自定义渲染时无效
   */
  fieldProps?: Record<string, any>
  /**
   * 同 label
   */
  title?: string | (() => VNodeChild)
  /**
   * 标题
   */
  label?: string | (() => VNodeChild)
  /**
   * 当 valueType 不满足需求时，可以自定义渲染
   * @param dataSource 数据源
   */
  render?: (dataSource: { [K in keyof T]: T[K] }) => VNodeChild
  /**
   * 组件的 slots，自定义渲染时无效
   */
  slots?: Record<string, AnyFn>
  /**
   * 组件前缀
   */
  addonBefore?: string
  /**
   * 组件后缀
   */
  addonAfter?: string
}

export type ProDescriptionColumns<T = InternalDataSource> = Array<ProDescriptionColumn<T>>
