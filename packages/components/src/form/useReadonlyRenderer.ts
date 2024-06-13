import { useInjectGlobalConfigContext } from '../config-provider'
import type { ProComponentConfig } from './field'

export function useReadonlyRenderer(options: ProComponentConfig) {
  const { value, slots } = options
  const { proForm } = useInjectGlobalConfigContext()

  function readonlyRender() {
    const { readonly } = slots.value
    return readonly
      ? readonly({ value: value.value })
      : proForm.readonlyRender?.(options)
  }

  function readonlyEmptyRender() {
    const { empty } = slots.value
    return empty
      ? empty({ value: value.value })
      : proForm.readonlyEmptyRender?.(options)
  }

  return {
    readonlyRender,
    readonlyEmptyRender,
  }
}
