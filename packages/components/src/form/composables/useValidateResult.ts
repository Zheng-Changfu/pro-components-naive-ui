import { computed, ref } from 'vue'
import { type Path, stringifyPath } from 'pro-components-hooks'
import type { ValidateError } from '../props'

/**
 * 维护校验结果，方便自定义 ui 校验
 */
export interface FormItemInternalValidateResult {
  valid: boolean
  errors: ValidateError[]
  warnings: ValidateError[]
}
export function useValidateResults() {
  const pathToValidateResultsMap = ref<Map<string, FormItemInternalValidateResult>>(new Map())

  function addValidateErrors(
    path: string | undefined,
    errors: ValidateError[] | undefined,
  ) {
    if (!path)
      return
    const map = pathToValidateResultsMap.value
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

  function addValidateWarnings(
    path: string | undefined,
    warnings: ValidateError[] | undefined,
  ) {
    if (!path)
      return
    const map = pathToValidateResultsMap.value
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

  function clearValidateResults(path?: Path) {
    if (!path) {
      pathToValidateResultsMap.value.clear()
      return
    }
    pathToValidateResultsMap.value.delete(stringifyPath(path))
  }

  function toJson() {
    const map = pathToValidateResultsMap.value
    const res = {} as any
    map.forEach((value, key) => {
      res[key] = value
    })
    return res as Record<string, FormItemInternalValidateResult>
  }

  function getFieldValidateResult(path: Path) {
    const p = stringifyPath(path)
    return pathToValidateResultsMap.value.get(p) ?? null
  }

  const validateResults = computed(() => {
    return toJson()
  })

  return {
    validateResults,
    addValidateErrors,
    addValidateWarnings,
    clearValidateResults,
    getFieldValidateResult,
    validateResultsMap: pathToValidateResultsMap,
  }
}
