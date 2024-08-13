import type { ProFieldSlots } from '../field'

export interface ProDynamicTagsSlots extends ProFieldSlots {
  trigger?: {
    disabled: boolean
    activate: () => void
  }
  input?: {
    deactivate: () => void
    submit: (value: any) => void
  }
}
