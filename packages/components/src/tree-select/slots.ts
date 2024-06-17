export interface ProTreeSelectSlots {
  'action': any
  'empty': any
  'arrow': any
  // 扩展的
  'readonly': { value: any }
  'readonly-empty': { value: any }
}

export const proTreeSelectExtendSlotKeys = [
  'readonly',
  'readonly-empty',
] as const
