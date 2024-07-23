import type { InjectionKey, MaybeRef, VNodeChild } from 'vue'
import { inject, provide } from 'vue'
import type { FormItemProps } from 'naive-ui'
import type { ProFormInstance } from './inst'

export const proFormInstanceContextKey = Symbol('proFormInstance') as InjectionKey<ProFormInstance>
export const proFormReadonlyContextKey = Symbol('proFormReadonly') as InjectionKey<MaybeRef<boolean | undefined>>
export const proFormItemRenderContextKey = Symbol('proFormItemRender') as InjectionKey<((
  opt: {
    bindProps: FormItemProps
    bindSlots: Record<string, any>
  }) => VNodeChild) | undefined>

export function provideProFormInstanceContext(inst: ProFormInstance) {
  provide(proFormInstanceContextKey, inst)
}

export function useInjectProFormInstanceContext() {
  return inject(proFormInstanceContextKey)!
}
