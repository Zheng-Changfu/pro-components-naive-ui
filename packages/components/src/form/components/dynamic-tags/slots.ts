import type { DynamicTagsProps } from 'naive-ui'
import type { ProFieldSharedSlots } from '../field'

export interface ProDynamicTagsSlots extends ProFieldSharedSlots<DynamicTagsProps> {
  'trigger': {
    disabled: boolean
    activate: () => void
  }
  // 原名 input，但是有冲突，这里用 input-input
  'input-input': {
    deactivate: () => void
    submit: (value: any) => void
  }
}
