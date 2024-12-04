import type { CheckboxGroupProps, CheckboxProps } from 'naive-ui'
import type { Merge } from 'type-fest'
import type { ProFieldSharedSlots } from '../field'

export type ProCheckboxGroupSlots = ProFieldSharedSlots<Merge<CheckboxGroupProps, {
  /**
   * 用户可以根据 options 自定义渲染
   */
  options: Array<Merge<CheckboxProps, { [x: string]: any }>>
}>>
