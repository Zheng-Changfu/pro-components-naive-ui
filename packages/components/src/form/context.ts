import type { FormRules } from 'naive-ui'
import type { MaybeRef, ToRef, VNodeChild } from 'vue'
import type { ValidationTrigger } from './props'
import { inject, shallowRef } from 'vue'
import { createInjectionKey } from '../composables/createInjectionKey'
import { useValidationResults } from './composables/useValidationResult'

export const proFormConfigInjectionKey = createInjectionKey<{
  rules: ToRef<FormRules | undefined>
  readonly: MaybeRef<boolean | undefined>
  fieldEmptyText: MaybeRef<string | (() => VNodeChild)>
  validationResults: ReturnType<typeof useValidationResults>
  validationTrigger: MaybeRef<ValidationTrigger | ValidationTrigger[]>
}>('pro-form-config')

export function useInjectProFormConfig() {
  return inject(proFormConfigInjectionKey, () => {
    return {
      readonly: undefined,
      fieldEmptyText: '-',
      validationTrigger: 'input',
      rules: shallowRef(undefined),
      validationResults: useValidationResults(),
    }
  }, true)
}
