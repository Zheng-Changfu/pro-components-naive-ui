import type { ColorPickerProps } from 'naive-ui'
import type { ProFieldSharedSlots } from '../field'

export interface ProColorPickerSlots extends ProFieldSharedSlots<ColorPickerProps> {
  'action': any
  /**
   * 原名 label，但是有冲突，这里用 input-label
   */
  'input-label': string | null
}
