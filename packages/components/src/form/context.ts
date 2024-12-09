import type { FormRules, PopoverProps } from 'naive-ui'
import type { MaybeRef, ToRef } from 'vue'
import type { ValidateBehavior, ValidationTrigger } from './props'
import { inject, shallowRef } from 'vue'
import { createInjectionKey } from '../composables/createInjectionKey'
import { useValidationResults } from './composables/useValidationResult'

export const proFormConfigInjectionKey = createInjectionKey<{
  rules: ToRef<FormRules | undefined>
  readonly: MaybeRef<boolean | undefined>
  validateBehavior: ToRef<ValidateBehavior | undefined>
  validateBehaviorProps: ToRef<PopoverProps | undefined>
  validationResults: ReturnType<typeof useValidationResults>
  validationTrigger: MaybeRef<ValidationTrigger | ValidationTrigger[]>
}>('pro-form-config')

export function useInjectProFormConfig() {
  return inject(proFormConfigInjectionKey, () => {
    return {
      readonly: undefined,
      validationTrigger: 'input',
      rules: shallowRef(undefined),
      validateBehavior: shallowRef(undefined),
      validationResults: useValidationResults(),
      validateBehaviorProps: shallowRef(undefined),
    }
  }, true)
}
