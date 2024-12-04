import type { RadioGroupProps, RadioProps } from 'naive-ui'
import type { Merge } from 'type-fest'
import type { ProFieldSharedSlots } from '../field'

export type ProRadioGroupSlots = ProFieldSharedSlots<Merge<RadioGroupProps, {
  /**
   * 用户可以根据 options 自定义渲染
   */
  options: Array<Merge<RadioProps, { [x: string]: any }>>
}>>
