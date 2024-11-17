import type { PopoverProps } from 'naive-ui'
import type { BaseField } from 'pro-composables'
import type { ComputedRef } from 'vue'
import type { InternalFieldValueType } from '../enums'
import type { FieldExtraInfo } from '../keys'
import { toString } from 'lodash-es'
import { computed, inject, unref } from 'vue'
import { proFormListContextKey } from '../../../../form-list/context'
import { useLocale } from '../../../../locales'
import { useInjectProFormContext } from '../../../context'
import { fieldExtraKey } from '../keys'

interface UseMergeOptions {
  field: BaseField
  label: ComputedRef<string | undefined>
  title: ComputedRef<string | undefined>
  readonly: ComputedRef<boolean | undefined>
  showLabel: ComputedRef<boolean | undefined>
  valueType: ComputedRef<InternalFieldValueType | undefined>
  behaviorProps: ComputedRef<PopoverProps | undefined>
  placeholder: ComputedRef<string | string[] | undefined>
  behavior: ComputedRef<'default' | 'popover' | undefined>
}
export function useMergeOptions(options: UseMergeOptions) {
  const {
    field,
    title,
    label,
    readonly,
    valueType,
    placeholder,
    behavior: propBehavior,
    showLabel: propShowLabel,
    behaviorProps: propBehaviorProps,
  } = options

  const {
    getMessage,
  } = useLocale('ProForm')

  const {
    showLabel,
  } = inject(proFormListContextKey, null) ?? {}

  const {
    validateBehavior,
    validateBehaviorProps,
    readonly: formReadonlyRef,
  } = useInjectProFormContext()

  const mergedTitle = computed(() => {
    return title.value ?? label.value
  })

  const mergedPlaceholder = computed(() => {
    const propPlaceholder = placeholder.value
    if (propPlaceholder !== undefined) {
      return propPlaceholder
    }
    if (!field.isList) {
      const localePlaceholder = getMessage('fieldPlaceholder')
      return localePlaceholder(toString(mergedTitle.value), valueType.value)
    }
  })

  const mergedReadonly = computed(() => {
    const propReadonly = readonly.value
    const formReadonly = unref(formReadonlyRef)
    if (propReadonly !== undefined) {
      return !!propReadonly
    }
    if (field.parent) {
      const extraInfo = field.parent[fieldExtraKey] as FieldExtraInfo
      return extraInfo.readonly.value
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
    if (unref(showLabel) !== undefined) {
      return unref(showLabel)
    }
  })

  return {
    mergedTitle,
    mergedReadonly,
    mergedBehavior,
    mergedShowLabel,
    mergedPlaceholder,
    mergedBehaviorProps,
  }
}
