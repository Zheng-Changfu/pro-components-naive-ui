import type { ProFieldColumnValueType } from '../form'
import type { AnyFn } from '../types'
import { isString } from 'lodash-es'
import { h, resolveComponent } from 'vue'

interface ResolveValueTypeOptions {
  /**
   * valueType 前缀
   * @default 'pro'
   */
  prefix?: string
  /**
   * 透传给组件的插槽
   */
  fieldSlots?: Record<string, AnyFn>
  /**
   * 透传给组件的属性
   */
  fieldProps?: Record<string, any>
  /**
   * 透传给 ProField 的属性
   */
  proFieldProps?: Record<string, any>
}
export function resolveValueType(valueType: ProFieldColumnValueType, options: ResolveValueTypeOptions = {}) {
  const {
    fieldSlots,
    fieldProps,
    proFieldProps,
    prefix = 'pro',
  } = options

  const Component = resolveComponent(`${prefix}-${valueType}`)
  if (!isString(Component)) {
    return h(Component, {
      ...proFieldProps,
      fieldProps,
    }, fieldSlots)
  }

  return null
}
