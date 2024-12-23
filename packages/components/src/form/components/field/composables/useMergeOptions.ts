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
  } = useInjectProFormConfig()

  const {
    renderFormItem,
    readonly: injectedReadonlyRef,
    showLabel: injectedShowLabelRef,
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
    const injectedReadonly = unref(injectedReadonlyRef)
    if (injectedReadonly !== undefined) {
      return injectedReadonly
    }
    const formReadonly = unref(formReadonlyRef)
    if (formReadonly !== undefined) {
      return !!formReadonly
    }
    return false
  })

  const mergedShowLabel = computed(() => {
    if (props.showLabel !== undefined) {
      return props.showLabel
    }
    const injectedShowLabel = unref(injectedShowLabelRef)
    if (injectedShowLabel !== undefined) {
      return injectedShowLabel
    }
  })

  const mergedRenderFormItem = computed(() => {
    return field.isList ? undefined : renderFormItem
  })

  return {
    mergedTitle,
    mergedReadonly,
    mergedShowLabel,
    mergedPlaceholder,
    mergedRenderFormItem,
  }
}
