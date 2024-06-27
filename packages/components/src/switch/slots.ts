export interface ProSwitchSlots {
  'icon': any
  'checked': any
  'unchecked': any
  'checked-icon': any
  'unchecked-icon': any
  // 扩展的
  'addon-after': any
  'addon-before': any
  'readonly': { value: any }
  'readonly-empty': { value: any }
}

export const proSwitchExtendSlotKeys = [
  'readonly',
  'addon-after',
  'addon-before',
  'readonly-empty',
] as const
