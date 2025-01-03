import type { ComputedRef } from 'vue'
import { createInjectionKey } from '../composables/createInjectionKey'

export const proDrawerFormInjectionKey = createInjectionKey<{
  loading: ComputedRef<boolean>
}>('pro-drawer-form')
