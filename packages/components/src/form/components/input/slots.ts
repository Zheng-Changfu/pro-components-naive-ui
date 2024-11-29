import type { InputProps } from 'naive-ui'
import type { ProFieldSharedSlots } from '../field'

export interface ProInputSlots extends ProFieldSharedSlots<InputProps> {
  'count': any
  'prefix': any
  'suffix': any
  'separator': any
  'clear-icon': any
  'password-visible-icon': any
  'password-invisible-icon': any
}

export type ProPasswordSlots = ProInputSlots
export type ProTextareaSlots = ProInputSlots
