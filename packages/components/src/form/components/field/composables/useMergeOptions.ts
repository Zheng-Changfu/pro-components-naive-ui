import type { BaseField } from 'pro-composables'
import type { ProFieldProps } from '../props'
import { toString } from 'lodash-es'
import { computed, inject, unref } from 'vue'
import { useLocale } from '../../../../locales'
import { useInjectProFormConfig } from '../../../context'
import { proFieldConfigInjectionKey } from '../context'

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
    readonly: formReadonlyRef,
    validateBehavior: formValidateBehaviorRef,
    validateBehaviorProps: formValidateBehaviorPropsRef,
  } = useInjectProFormConfig()

  const {
    readonly: listFieldInjectedReadonlyRef,
    showLabel: listFieldInjectedShowLabelRef,
    validateBehavior: listFieldInjectedValidateBehaviorRef,
    validateBehaviorProps: listFieldInjectedValidateBehaviorPropsRef,
  } = inject(proFieldConfigInjectionKey, null) ?? {}

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
    if (props.readonly !== undefined) {
      return !!props.readonly
    }
    const listFieldInjectedReadonly = unref(listFieldInjectedReadonlyRef)
    if (listFieldInjectedReadonly !== undefined) {
      return listFieldInjectedReadonly
    }
    const formReadonly = unref(formReadonlyRef)
    if (formReadonly !== undefined) {
      return !!formReadonly
    }
    return false
  })

  const mergedValidateBehavior = computed(() => {
    if (props.validateBehavior !== undefined) {
      return props.validateBehavior
    }
    const listFieldInjectedValidateBehavior = unref(listFieldInjectedValidateBehaviorRef)
    if (listFieldInjectedValidateBehavior !== undefined) {
      return listFieldInjectedValidateBehavior
    }
    const formValidateBehavior = unref(formValidateBehaviorRef)
    if (formValidateBehavior !== undefined) {
      return formValidateBehavior
    }
    return 'default'
  })

  const mergedValidateBehaviorProps = computed(() => {
    return {
      ...(unref(formValidateBehaviorPropsRef) ?? {}),
      ...(unref(listFieldInjectedValidateBehaviorPropsRef) ?? {}),
      ...(props.validateBehaviorProps ?? {}),
    }
  })

  const mergedShowLabel = computed(() => {
    if (props.showLabel !== undefined) {
      return props.showLabel
    }
    const listFieldInjectedShowLabel = unref(listFieldInjectedShowLabelRef)
    if (listFieldInjectedShowLabel !== undefined) {
      return listFieldInjectedShowLabel
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
