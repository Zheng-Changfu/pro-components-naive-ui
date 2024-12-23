import type { MaybeRef, VNodeChild } from 'vue'
import type { UnwrapSlots } from '../../../types'
import type { ProFormItemProps, ProFormItemSlots } from '../form-item'
import { createInjectionKey } from '../../../composables/createInjectionKey'

export const proFieldConfigInjectionKey = createInjectionKey<{
  readonly?: MaybeRef<boolean | undefined>
  showLabel?: MaybeRef<boolean | undefined>
  renderFormItem?: (props: ProFormItemProps, slots: UnwrapSlots<ProFormItemSlots>) => VNodeChild
}>('pro-field-config')
