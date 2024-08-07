import { computed } from 'vue'
import { useInjectFieldContext } from 'pro-components-hooks'
import { useInjectProFormInst } from '../../../context'

export function useFieldValidateStatus() {
  const field = useInjectFieldContext()
  const formInst = useInjectProFormInst()

  const fieldValidateResult = computed(() => {
    const path = field?.path.value
    if (!path)
      return
    return formInst.getFieldValidateResult(path)
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
