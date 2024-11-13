import type { PopoverProps } from 'naive-ui'
import type { InternalPath } from 'pro-components-hooks'
import type { InjectionKey, MaybeRef, ToRef } from 'vue'
import type { ProFormInst } from './inst'
import type { ValidateBehavior, ValidateError, ValidationTrigger } from './props'
import { noop } from 'lodash-es'
import { inject, provide } from 'vue'

export const proFormInstContextKey = Symbol('proFormInst') as InjectionKey<ProFormInst>

export const proFormContextKey = Symbol('proForm') as InjectionKey<{
  readonly: MaybeRef<boolean | undefined>
  readonlyEmptyText: MaybeRef<string | undefined>
  validateBehavior: ToRef<ValidateBehavior | undefined>
  validateBehaviorProps: ToRef<PopoverProps | undefined>
  validationTrigger: MaybeRef<ValidationTrigger | ValidationTrigger[]>
  clearValidationResults: (path?: InternalPath) => void
  addValidationErrors: (path: string | undefined, errors: ValidateError[] | undefined) => void
  addValidationWarnings: (path: string | undefined, errors: ValidateError[] | undefined) => void
}>

export function provideProFormInst(inst: ProFormInst) {
  provide(proFormInstContextKey, inst)
}

export function useInjectProFormInst() {
  return inject(proFormInstContextKey)
}

export function useInjectProFormContext() {
  return inject(proFormContextKey, {
    readonly: undefined,
    readonlyEmptyText: '-',
    addValidationErrors: noop,
    clearValidationResults: noop,
    addValidationWarnings: noop,
    validationTrigger: 'input',
    validateBehavior: ref(undefined),
    validateBehaviorProps: ref(undefined),
  })!
}
