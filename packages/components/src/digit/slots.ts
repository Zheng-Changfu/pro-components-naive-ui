export interface ProDigitSlots {
  'prefix': any
  'suffix': any
  'add-icon': any
  'minus-icon': any
  // 扩展的
  'empty': { value: any }
  'readonly': { value: any }
}

export const proDigitExtendSlotKeys = [
  'empty',
  'readonly',
] as const
