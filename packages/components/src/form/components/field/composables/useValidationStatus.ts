import type { BaseField } from 'pro-composables'
import { useThemeVars } from 'naive-ui'
import { useInjectField } from 'pro-composables'
import { computed } from 'vue'
import { proFormInternalKey, useInjectProForm } from '../../../composables/createProForm'

export function useValidationStatus(baseField?: BaseField) {
  const themeVars = useThemeVars()
  const proForm = useInjectProForm()
  const field = baseField ?? useInjectField()

  const fieldValidateResult = computed(() => {
    const path = field?.path.value
    if (path) {
      return proForm?.[proFormInternalKey]
        .validationResults
        .getFieldValidationResult(path)
    }
  })

  const errors = computed(() => {
    return fieldValidateResult.value?.errors ?? []
  })

  const warnings = computed(() => {
    return fieldValidateResult.value?.warnings ?? []
  })

  const feedbackColor = computed(() => {
    return errors.value.length > 0
      ? themeVars.value.errorColor
      : warnings.value.length > 0
        ? themeVars.value.warningColor
        : ''
  })

  const feedbacks = computed(() => {
    return errors.value.length > 0 ? errors.value : warnings.value
  })

  return {
    errors,
    warnings,
    feedbacks,
    feedbackColor,
  }
}
