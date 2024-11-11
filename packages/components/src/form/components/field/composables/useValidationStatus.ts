import { useThemeVars } from 'naive-ui'
import { useInjectFieldContext } from 'pro-components-hooks'
import { computed } from 'vue'
import { useInjectProFormInst } from '../../../context'

export function useValidationStatus() {
  const themeVars = useThemeVars()
  const field = useInjectFieldContext()
  const formInst = useInjectProFormInst()

  const fieldValidateResult = computed(() => {
    const path = field?.path.value
    if (!path)
      return
    return formInst?.getFieldValidationResult(path)
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
