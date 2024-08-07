import type { ProFieldSlots } from '../field'

export interface ProInputSlots extends ProFieldSlots {
  'count'?: any
  'prefix'?: any
  'suffix'?: any
  'separator'?: any
  'clear-icon'?: any
  'password-visible-icon'?: any
  'password-invisible-icon'?: any
}

export type ProPasswordSlots = ProInputSlots
export type ProTextareaSlots = ProInputSlots
