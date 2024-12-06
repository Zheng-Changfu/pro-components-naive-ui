import type { BaseField } from 'pro-composables'
import type { FieldExtraInfo } from '../field-extra-info'
import { useThemeVars } from 'naive-ui'
import { useInjectField } from 'pro-composables'
import { computed, isVNode } from 'vue'
import { isEmptyValue } from '../../../../_utils/isEmptyValue'
import { throwError } from '../../../../_utils/warn'
import { useInjectGlobalConfig, useInjectWrappedIn } from '../../../../config-provider'
import { useInjectProFormConfig } from '../../../context'
import { fieldExtraKey } from '../field-extra-info'

/**
 * 工具 composable
 */
export function useFieldUtils(field?: BaseField) {
  field = field ?? useInjectField()!
  if (!field && __DEV__) {
    throwError('useFieldUtils', 'field not exist')
  }
  const themeVars = useThemeVars()
  const wrappedIn = useInjectWrappedIn()

  const {
    readonly,
  } = field[fieldExtraKey] as FieldExtraInfo

  const {
    mergedEmpty,
  } = useInjectGlobalConfig()

  const {
    validationResults,
  } = useInjectProFormConfig()

  const empty = computed(() => {
    return isEmptyValue(field.value.value)
  })

  const emptyDom = computed(() => {
    const dom = mergedEmpty(wrappedIn)
    return isVNode(dom) ? dom : <span>{dom}</span>
  })

  const readonlyText = computed(() => {
    return empty.value
      ? emptyDom.value
      : field.value.value
  })

  const fieldValidateResult = computed(() => {
    const path = field?.path.value
    if (path) {
      return validationResults.getFieldValidationResult(path)
    }
  })

  const errors = computed(() => {
    return fieldValidateResult.value?.errors ?? []
  })

  const warnings = computed(() => {
    return fieldValidateResult.value?.warnings ?? []
  })

  const feedbacks = computed(() => {
    return errors.value.length > 0 ? errors.value : warnings.value
  })

  const feedbackColor = computed(() => {
    return errors.value.length > 0
      ? themeVars.value.errorColor
      : warnings.value.length > 0
        ? themeVars.value.warningColor
        : ''
  })

  return {
    empty,
    readonly,
    emptyDom,
    readonlyText,
    value: field.value,
    /** validationStatus */
    errors,
    warnings,
    feedbacks,
    feedbackColor,
    /** validationStatus */
  }
}
