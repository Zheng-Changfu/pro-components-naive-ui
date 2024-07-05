import { unref } from 'vue'
import type { ProFieldConfig } from '../field'
import { useInjectGlobalConfigContext } from '../../config-provider'

export function useReadonlyRenderer(options: ProFieldConfig) {
  const { value, slots } = options
  const { proForm } = useInjectGlobalConfigContext()

  function readonlyRender() {
    const { readonly } = unref(slots)
    return readonly
      ? readonly({ value: value.value })
      : proForm.readonlyRender?.(options)
  }

  function readonlyEmptyRender() {
    const { 'readonly-empty': readonlyEmpty } = unref(slots)
    return readonlyEmpty
      ? readonlyEmpty({ value: value.value })
      : proForm.readonlyEmptyRender?.(options)
  }

  return {
    readonlyRender,
    readonlyEmptyRender,
  }
}
