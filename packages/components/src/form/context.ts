import type { PopoverProps } from 'naive-ui'
import type { InternalPath } from 'pro-composables'
import type { InjectionKey, MaybeRef, ToRef } from 'vue'
import type { FormItemInternalValidateResult } from './composables/useValidationResult'
import type { ValidateBehavior, ValidateError, ValidationTrigger } from './props'
import { noop } from 'lodash-es'
import { inject } from 'vue'

export const proFormConfigKey = Symbol('proFormConfig') as InjectionKey<{
  readonly: MaybeRef<boolean | undefined>
  readonlyEmptyText: MaybeRef<string | undefined>
  validateBehavior: ToRef<ValidateBehavior | undefined>
  validateBehaviorProps: ToRef<PopoverProps | undefined>
  validationTrigger: MaybeRef<ValidationTrigger | ValidationTrigger[]>
  clearValidationResults: (path?: InternalPath) => void
  getFieldValidationResult: (path: InternalPath) => FormItemInternalValidateResult | null
  addValidationErrors: (path: string | undefined, errors: ValidateError[] | undefined) => void
  addValidationWarnings: (path: string | undefined, errors: ValidateError[] | undefined) => void
}>

export function useInjectProFormConfig() {
  return inject(proFormConfigKey, {
    readonly: undefined,
    readonlyEmptyText: '-',
    validationTrigger: 'input',
    validateBehavior: ref(undefined),
    validateBehaviorProps: ref(undefined),

    addValidationErrors: noop,
    addValidationWarnings: noop,
    clearValidationResults: noop,
    getFieldValidationResult: noop as any,
  })!
}
