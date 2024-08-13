import type { ProFieldSlots } from '../field'

export interface ProColorPickerSlots extends ProFieldSlots {
  action?: any
  // 原名 label，但是和 form-item 冲突，这里用 title
  title?: string | null
}
