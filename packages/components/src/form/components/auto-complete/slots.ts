import type { AutoCompleteProps } from 'naive-ui'
import type { ProFieldSharedSlots } from '../field'

export interface ProAutoCompleteSlots extends ProFieldSharedSlots<AutoCompleteProps> {
  default: {
    value: string
    theme: string | null
    handleBlur: () => void
    handleFocus: () => void
    handleInput: (value: string) => void
  }
  empty: any
  prefix: any
  suffix: any
}
