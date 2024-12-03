import type { MaybeRef } from 'vue'
import { createInjectionKey } from '../../../composables/createInjectionKey'

export const proFieldConfigInjectionKey = createInjectionKey<{
  showLabel: MaybeRef<boolean | undefined>
}>('pro-field-config')
