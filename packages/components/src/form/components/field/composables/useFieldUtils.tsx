import type { BaseField } from 'pro-composables'
import type { FieldExtraInfo } from '../field-extra-info'
import { toValue } from '@vueuse/core'
import { useThemeVars } from 'naive-ui'
import { useInjectField } from 'pro-composables'
import { computed, isVNode } from 'vue'
import { isEmptyValue } from '../../../../_utils/isEmptyValue'
import { throwError } from '../../../../_utils/warn'
import { useInjectProFormConfig } from '../../../context'
import { fieldExtraKey } from '../field-extra-info'

export function useFieldUtils(field?: BaseField) {
  field = field ?? useInjectField()!
  if (!field) {
    throwError('useFieldUtils', 'field not exist')
  }
  const themeVars = useThemeVars()

  const {
    readonly,
  } = field[fieldExtraKey] as FieldExtraInfo

  const {
    fieldEmptyText,
    validationResults,
  } = useInjectProFormConfig()

  const empty = computed(() => {
    return isEmptyValue(field.value.value)
  })

  const emptyDom = computed(() => {
    const dom = toValue(fieldEmptyText)
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
