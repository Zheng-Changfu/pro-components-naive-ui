export interface ProDigitSlots {
  'prefix': any
  'suffix': any
  'add-icon': any
  'minus-icon': any
  // 扩展的
  'addon-after': any
  'addon-before': any
  'readonly': { value: any }
  'readonly-empty': { value: any }
}

export const proDigitExtendSlotKeys = [
  'readonly',
  'addon-after',
  'addon-before',
  'readonly-empty',
] as const
