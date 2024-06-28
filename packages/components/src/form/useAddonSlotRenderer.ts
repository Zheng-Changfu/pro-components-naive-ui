import { computed } from 'vue'
import type { ProComponentConfig } from './field'

export function useAddonSlotRenderer(options: ProComponentConfig) {
  const { slots } = options

  const addonBeforeSlot = computed(() => {
    return slots.value['addon-before']
  })

  const addonAfterSlot = computed(() => {
    return slots.value['addon-after']
  })

  return {
    addonAfterSlot,
    addonBeforeSlot,
  }
}
