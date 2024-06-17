export interface ProRateSlots {
  'default': { index: number }
  // 扩展的
  'readonly': { value: any }
  'readonly-empty': { value: any }
}

export const proRateExtendSlotKeys = [
  'readonly',
  'readonly-empty',
] as const
