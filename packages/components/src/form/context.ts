import type { PopoverProps } from 'naive-ui'
import type { InjectionKey, MaybeRef, ToRef } from 'vue'
import type { ValidateBehavior, ValidationTrigger } from './props'
import { inject, shallowRef } from 'vue'
import { useValidationResults } from './composables/useValidationResult'

export const proFormConfigKey = Symbol('proFormConfig') as InjectionKey<{
  readonlyEmptyText: MaybeRef<string>
  readonly: MaybeRef<boolean | undefined>
  validateBehavior: ToRef<ValidateBehavior | undefined>
  validateBehaviorProps: ToRef<PopoverProps | undefined>
  validationResults: ReturnType<typeof useValidationResults>
  validationTrigger: MaybeRef<ValidationTrigger | ValidationTrigger[]>
}>

export function useInjectProFormConfig() {
  return inject(proFormConfigKey, () => {
    return {
      readonly: undefined,
      readonlyEmptyText: '-',
      validationTrigger: 'input',
      validateBehavior: shallowRef(undefined),
      validationResults: useValidationResults(),
      validateBehaviorProps: shallowRef(undefined),
    }
  }, true)
}
