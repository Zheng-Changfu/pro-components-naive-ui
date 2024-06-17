export interface ProInputSlots {
  'count': any
  'prefix': any
  'suffix': any
  'separator': any
  'clear-icon': any
  'password-visible-icon': any
  'password-invisible-icon': any
  // 扩展的
  'readonly': { value: any }
  'readonly-empty': { value: any }
}

export const proInputExtendSlotKeys = [
  'readonly',
  'readonly-empty',
] as const
