export interface ProRadioSlots {
  'default': any
  // 扩展的
  'readonly': { value: any }
  'readonly-empty': { value: any }
}

export const proRadioExtendSlotKeys = [
  'readonly',
  'readonly-empty',
] as const
