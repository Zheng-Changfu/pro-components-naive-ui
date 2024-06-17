export interface ProSelectSlots {
  'header': any
  'action': any
  'empty': any
  'arrow': any
  // 扩展的
  'readonly': { value: any }
  'readonly-empty': { value: any }
}

export const proSelectExtendSlotKeys = [
  'readonly',
  'readonly-empty',
] as const
