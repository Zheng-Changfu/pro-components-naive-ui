export interface ProTimeSlots {
  'icon': any
  // 扩展的
  'readonly': { value: any }
  'readonly-empty': { value: any }
}

export const proTimeExtendSlotKeys = [
  'readonly',
  'readonly-empty',
] as const
