export interface ProDateMonthRangeSlots {
  'footer': any
  'prev-year': any
  'next-year': any
  'separator': any
  'date-icon': any
  'next-month': any
  'prev-month': any
  // 扩展的
  'readonly': { value: any }
  'readonly-empty': { value: any }
}

export const proDateMonthRangeExtendSlotKeys = [
  'readonly',
  'readonly-empty',
] as const
