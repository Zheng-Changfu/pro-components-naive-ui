import type { PopoverProps } from 'naive-ui'
import type { MaybeRef } from 'vue'
import type { ValidateBehavior } from '../../props'
import { createInjectionKey } from '../../../composables/createInjectionKey'

export const proFieldConfigInjectionKey = createInjectionKey<{
  readonly?: MaybeRef<boolean | undefined>
  showLabel?: MaybeRef<boolean | undefined>
  validateBehavior?: MaybeRef<ValidateBehavior | undefined>
  validateBehaviorProps?: MaybeRef<PopoverProps | undefined>
}>('pro-field-config')
