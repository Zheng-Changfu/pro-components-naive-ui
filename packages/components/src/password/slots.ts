export interface ProPasswordSlots {
  'count': any
  'prefix': any
  'suffix': any
  'separator': any
  'clear-icon': any
  'password-visible-icon': any
  'password-invisible-icon': any
  // 扩展的
  'addon-after': any
  'addon-before': any
  'readonly': { value: any }
  'readonly-empty': { value: any }
}

export const proPasswordExtendSlotKeys = [
  'readonly',
  'addon-after',
  'addon-before',
  'readonly-empty',
] as const
