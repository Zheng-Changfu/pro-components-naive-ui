import type { InjectionKey, MaybeRef, ToRef } from 'vue'
import { inject, provide } from 'vue'
import type { ProFormInstance } from './inst'
import type { FormItemRender } from './components/field/props'

export const proFormInstanceContextKey = Symbol('proFormInstance') as InjectionKey<ProFormInstance>

export const proFormContextKey = Symbol('proForm') as InjectionKey<{
  readonly: MaybeRef<boolean | undefined>
  useFormItemGi: ToRef<boolean | undefined>
  formItemRender: FormItemRender | undefined
}>

export function provideProFormInstance(inst: ProFormInstance) {
  provide(proFormInstanceContextKey, inst)
}

export function useInjectProFormInstance() {
  return inject(proFormInstanceContextKey)!
}
