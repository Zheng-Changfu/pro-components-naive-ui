import type { ComputedRef } from 'vue'
import { useInjectGlobalConfigContext } from '../config-provider'

interface UseReadonlyRendererOptions {
  type: string
  value: ComputedRef<any>
  props: ComputedRef<Record<string, any>>
  slots: ComputedRef<Record<string, any>>
}
export function useReadonlyRenderer(options: UseReadonlyRendererOptions) {
  const { type, value, props, slots } = options
  const { proForm } = useInjectGlobalConfigContext()

  function readonlyRender() {
    const { readonly: userReadonly } = slots.value
    return userReadonly
      ? userReadonly({ value: value.value })
      : proForm?.value?.readonlyRender?.(value.value, {
        type,
        props: props.value,
        slots: slots.value,
      })
  }

  function readonlyEmptyRender() {
    const { empty: userEmpty } = slots.value
    return userEmpty
      ? userEmpty({ value: value.value })
      : proForm?.value?.readonlyEmptyRender?.({
        type,
        props: props.value,
        slots: slots.value,
      })
  }

  return {
    readonlyRender,
    readonlyEmptyRender,
  }
}
