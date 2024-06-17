export interface ProSliderSlots {
  'thumb': any
  // 扩展的
  'readonly': { value: any }
  'readonly-empty': { value: any }
}

export const proSliderExtendSlotKeys = [
  'readonly',
  'readonly-empty',
] as const
