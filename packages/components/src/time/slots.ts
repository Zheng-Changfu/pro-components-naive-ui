export interface ProTimeSlots {
  icon: any
  // 扩展的
  empty: { value: any }
  readonly: { value: any }
}

export const proTimeExtendSlotKeys = [
  'empty',
  'readonly',
] as const
