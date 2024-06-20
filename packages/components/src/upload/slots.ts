export interface ProUploadSlots {
  'default': any
  // 扩展的
  'readonly': { value: any }
  'readonly-empty': { value: any }
}

export const proUploadExtendSlotKeys = [
  'readonly',
  'readonly-empty',
] as const
