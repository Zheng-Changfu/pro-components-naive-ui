export interface ProTransferSlots {
  // 扩展的
  'readonly': { value: any }
  'readonly-empty': { value: any }
}

export const proTransferExtendSlotKeys = [
  'readonly',
  'readonly-empty',
] as const
