export interface ProCheckboxGroupSlots {
  // 扩展的
  'addon-after': any
  'addon-before': any
  'readonly': { value: any }
  'readonly-empty': { value: any }
}

export const proCheckboxGroupExtendSlotKeys = [
  'readonly',
  'addon-after',
  'addon-before',
  'readonly-empty',
] as const
