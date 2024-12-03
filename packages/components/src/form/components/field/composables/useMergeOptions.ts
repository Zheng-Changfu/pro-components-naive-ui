import type { BaseField } from 'pro-composables'
import type { FieldExtraInfo } from '../field-extra-info'
import type { ProFieldProps } from '../props'
import { toString } from 'lodash-es'
import { computed, inject, unref } from 'vue'
import { proFormListConfigInjectionKey } from '../../../../form-list/context'
import { useLocale } from '../../../../locales'
import { useInjectProFormConfig } from '../../../context'
import { fieldExtraKey } from '../field-extra-info'

interface UseMergeOptions {
  field: BaseField
}
export function useMergeOptions(props: ProFieldProps, options: UseMergeOptions) {
  const {
    field,
  } = options

  const {
    getMessage,
  } = useLocale('ProForm')

  const {
    showLabel,
  } = inject(proFormListConfigInjectionKey, null) ?? {}

  const {
    validateBehavior,
    validateBehaviorProps,
    readonly: formReadonlyRef,
  } = useInjectProFormConfig()

  const mergedTitle = computed(() => {
    return props.title ?? props.label
  })

  const mergedPlaceholder = computed(() => {
    if (props.placeholder !== undefined) {
      return props.placeholder
    }
    if (!field.isList) {
      const localePlaceholder = getMessage('fieldPlaceholder')
      return localePlaceholder(toString(mergedTitle.value), props.valueType)
    }
  })

  const mergedReadonly = computed(() => {
    const formReadonly = unref(formReadonlyRef)
    if (props.readonly !== undefined) {
      return !!props.readonly
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

  const mergedValidateBehavior = computed(() => {
    return props.validateBehavior ?? validateBehavior.value ?? 'default'
  })

  const mergedValidateBehaviorProps = computed(() => {
    return {
      ...(validateBehaviorProps.value ?? {}),
      ...(props.validateBehaviorProps ?? {}),
    }
  })

  const mergedShowLabel = computed(() => {
    if (props.showLabel !== undefined) {
      return props.showLabel
    }
    if (unref(showLabel) !== undefined) {
      return unref(showLabel)
    }
  })

  const mergedShowFeedback = computed(() => {
    return props.showFeedback ?? mergedValidateBehavior.value !== 'popover'
  })

  return {
    mergedTitle,
    mergedReadonly,
    mergedShowLabel,
    mergedPlaceholder,
    mergedShowFeedback,
    mergedValidateBehavior,
    mergedValidateBehaviorProps,
  }
}
