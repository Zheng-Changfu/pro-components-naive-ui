import { computed, unref } from 'vue'
import type { ProFieldConfig } from '../field'

export function useAddonSlotRenderer(options: ProFieldConfig) {
  const { slots } = options

  const addonBeforeSlot = computed(() => {
    return unref(slots)['addon-before']
  })

  const addonAfterSlot = computed(() => {
    return unref(slots)['addon-after']
  })

  return {
    addonAfterSlot,
    addonBeforeSlot,
  }
}
