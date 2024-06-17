export interface ProDigitSlots {
  'prefix': any
  'suffix': any
  'add-icon': any
  'minus-icon': any
  // 扩展的
  'readonly': { value: any }
  'readonly-empty': { value: any }
}

export const proDigitExtendSlotKeys = [
  'readonly',
  'readonly-empty',
] as const
