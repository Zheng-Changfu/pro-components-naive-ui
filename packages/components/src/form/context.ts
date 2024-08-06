import type { InjectionKey, MaybeRef, ToRef } from 'vue'
import { inject, provide } from 'vue'
import type { PopoverProps } from 'naive-ui'
import type { ProFormInst } from './inst'
import type { ValidateBehavior, ValidateError } from './props'

export const proFormInstContextKey = Symbol('proFormInst') as InjectionKey<ProFormInst>

export const proFormContextKey = Symbol('proForm') as InjectionKey<{
  readonly: MaybeRef<boolean | undefined>
  useFormItemGi: ToRef<boolean | undefined>
  validateBehavior: ToRef<ValidateBehavior | undefined>
  validateBehaviorProps: ToRef<PopoverProps | undefined>
  clearValidateResults: (path?: string) => void
  addValidateErrors: (path: string | undefined, errors: ValidateError[] | undefined) => void
  addValidateWarnings: (path: string | undefined, errors: ValidateError[] | undefined) => void
}>

export function provideProFormInst(inst: ProFormInst) {
  provide(proFormInstContextKey, inst)
}

export function useInjectProFormInst() {
  return inject(proFormInstContextKey)!
}
