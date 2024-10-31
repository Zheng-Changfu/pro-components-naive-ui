import { useInjectFieldContext } from 'pro-components-hooks'
import { computed } from 'vue'
import { useInjectProFormInst } from '../../../context'

export function useFieldValidateStatus() {
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

  return {
    errors,
    warnings,
  }
}
