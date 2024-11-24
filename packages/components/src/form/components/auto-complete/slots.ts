import type { ProFieldSlots } from '../field'

export interface ProAutoCompleteSlots extends ProFieldSlots {
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
