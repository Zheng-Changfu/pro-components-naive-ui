export interface ProCheckboxSlots {
  'default': any
  // 扩展的
  'readonly': { value: any }
  'readonly-empty': { value: any }
}

export const proCheckboxExtendSlotKeys = [
  'readonly',
  'readonly-empty',
] as const
