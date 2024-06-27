export interface ProSliderSlots {
  'thumb': any
  // 扩展的
  'addon-after': any
  'addon-before': any
  'readonly': { value: any }
  'readonly-empty': { value: any }
}

export const proSliderExtendSlotKeys = [
  'readonly',
  'addon-after',
  'addon-before',
  'readonly-empty',
] as const
