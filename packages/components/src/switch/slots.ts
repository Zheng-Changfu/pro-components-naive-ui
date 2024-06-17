export interface ProSwitchSlots {
  'icon': any
  'checked': any
  'unchecked': any
  'checked-icon': any
  'unchecked-icon': any
  // 扩展的
  'readonly': { value: any }
  'readonly-empty': { value: any }
}

export const proSwitchExtendSlotKeys = [
  'readonly',
  'readonly-empty',
] as const
