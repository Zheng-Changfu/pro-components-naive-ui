export interface ProDateQuarterRangeSlots {
  'footer': any
  'prev-year': any
  'next-year': any
  'separator': any
  'date-icon': any
  'next-month': any
  'prev-month': any
  // 扩展的
  'addon-after': any
  'addon-before': any
  'readonly': { value: any }
  'readonly-empty': { value: any }
}

export const proDateQuarterRangeExtendSlotKeys = [
  'readonly',
  'addon-after',
  'addon-before',
  'readonly-empty',
] as const
