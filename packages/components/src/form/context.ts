import type { ComputedRef, InjectionKey, MaybeRef, VNodeChild } from 'vue'
import { inject, provide } from 'vue'
import type { FormItemProps } from 'naive-ui'
import type { ProFormInstance } from './inst'
import type { ValidateMessages } from './form-item'

export const proFormInstanceContextKey = Symbol('proFormInstance') as InjectionKey<ProFormInstance>

export const proFormContextKey = Symbol('proForm') as InjectionKey<{
  readonly: MaybeRef<boolean | undefined>
  formItemRender: ((opt: {
    bindProps: FormItemProps
    bindSlots: Record<string, any>
  }) => VNodeChild) | undefined
  mergedValidateMessages: ComputedRef<ValidateMessages>
}>

export function provideProFormInstance(inst: ProFormInstance) {
  provide(proFormInstanceContextKey, inst)
}

export function useInjectProFormInstance() {
  return inject(proFormInstanceContextKey)!
}
