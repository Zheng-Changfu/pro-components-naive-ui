import type { InternalPath } from 'pro-components-hooks'
import type { ValidateError } from '../props'
import { stringifyPath } from 'pro-components-hooks'
import { computed, ref } from 'vue'

/**
 * 维护校验结果，方便自定义 ui 校验
 */
export interface FormItemInternalValidateResult {
  valid: boolean
  errors: ValidateError[]
  warnings: ValidateError[]
}
export function useValidationResults() {
  const pathToValidationResultsMap = ref<Map<string, FormItemInternalValidateResult>>(new Map())

  function addValidationErrors(
    path: string | undefined,
    errors: ValidateError[] | undefined,
  ) {
    if (!path)
      return
    const map = pathToValidationResultsMap.value
    if (!map.has(path)) {
      map.set(path, {
        valid: false,
        errors: [],
        warnings: [],
      })
    }
    const result = map.get(path)!
    result.valid = false
    result.errors = errors ?? []
  }

  function addValidationWarnings(
    path: string | undefined,
    warnings: ValidateError[] | undefined,
  ) {
    if (!path)
      return
    const map = pathToValidationResultsMap.value
    if (!map.has(path)) {
      map.set(path, {
        valid: true,
        errors: [],
        warnings: [],
      })
    }
    const result = map.get(path)!
    result.valid = true
    result.warnings = warnings ?? []
  }

  function clearValidationResults(path?: InternalPath) {
    if (!path) {
      pathToValidationResultsMap.value.clear()
      return
    }
    pathToValidationResultsMap.value.delete(stringifyPath(path))
  }

  function toJson() {
    const map = pathToValidationResultsMap.value
    const res = {} as any
    map.forEach((value, key) => {
      res[key] = value
    })
    return res as Record<string, FormItemInternalValidateResult>
  }

  function getFieldValidationResult(path: InternalPath) {
    const p = stringifyPath(path)
    return pathToValidationResultsMap.value.get(p) ?? null
  }

  const validationResults = computed(() => {
    return toJson()
  })

  return {
    validationResults,
    addValidationErrors,
    addValidationWarnings,
    clearValidationResults,
    getFieldValidationResult,
    validationResultsMap: pathToValidationResultsMap,
  }
}
