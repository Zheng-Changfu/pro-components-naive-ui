import type { ComputedRef } from 'vue'
import { computed, inject, unref } from 'vue'
import type { BaseField } from 'pro-components-hooks'
import type { PopoverProps } from 'naive-ui'
import { fieldExtraKey } from '../keys'
import { useInjectGlobalConfig } from '../../../../config-provider'
import { proFormContextKey } from '../../../context'
import { proFormListContextKey } from '../../../../form-list'

interface UseMergeOptions {
  field: BaseField
  readonly: ComputedRef<boolean | undefined>
  showLabel: ComputedRef<boolean | undefined>
  behaviorProps: ComputedRef<PopoverProps | undefined>
  placeholder: ComputedRef<string | string[] | undefined>
  behavior: ComputedRef<'default' | 'popover' | undefined>
}
export function useMergeOptions(options: UseMergeOptions) {
  const {
    field,
    readonly,
    placeholder,
    behavior: propBehavior,
    showLabel: propShowLabel,
    behaviorProps: propBehaviorProps,
  } = options

  const {
    renderPlaceholder,
  } = useInjectGlobalConfig().proForm

  const {
    showLabel,
  } = inject(proFormListContextKey, null) ?? {}

  const {
    validateBehavior,
    validateBehaviorProps,
    readonly: formReadonlyRef,
  } = inject(proFormContextKey)!

  const mergedPlaceholder = computed(() => {
    const propPlaceholder = placeholder.value
    if (propPlaceholder !== undefined) {
      return propPlaceholder
    }
    if (renderPlaceholder !== undefined && !field.isList) {
      return renderPlaceholder(field[fieldExtraKey])
    }
  })

  const mergedReadonly = computed(() => {
    const propReadonly = readonly.value
    const formReadonly = unref(formReadonlyRef)
    if (propReadonly !== undefined) {
      return !!propReadonly
    }

    if (formReadonly !== undefined) {
      return !!formReadonly
    }
    return false
  })

  const mergedBehavior = computed(() => {
    return propBehavior.value ?? validateBehavior.value ?? 'default'
  })

  const mergedBehaviorProps = computed(() => {
    return {
      ...(validateBehaviorProps.value ?? {}),
      ...(propBehaviorProps.value ?? {}),
    }
  })

  const mergedShowLabel = computed(() => {
    if (propShowLabel.value !== undefined) {
      return propShowLabel.value
    }
    if (showLabel?.value !== undefined) {
      return showLabel.value
    }
  })

  return {
    mergedReadonly,
    mergedBehavior,
    mergedShowLabel,
    mergedPlaceholder,
    mergedBehaviorProps,
  }
}
