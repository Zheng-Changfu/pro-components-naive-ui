import type { ProFieldConfig } from '../field'
import { useInjectGlobalConfigContext } from '../../config-provider'
import type { ProFormItemProps } from './props'

export function useReadonlyRenderer(props: ProFormItemProps, options: ProFieldConfig) {
  const { value } = options
  const { proForm } = useInjectGlobalConfigContext()

  function renderReadonly() {
    const { renderReadonly: propRenderReadonly } = props
    const { renderReadonly: globalRenderReadonly } = proForm

    return propRenderReadonly
      ? propRenderReadonly({ value: value.value })
      : globalRenderReadonly
        ? globalRenderReadonly(options)
        : value.value
  }

  function renderReadonlyEmpty() {
    const { renderReadonlyEmpty: propRenderReadonlyEmpty } = props
    const { renderReadonlyEmpty: globalRenderReadonlyEmpty } = proForm

    return propRenderReadonlyEmpty
      ? propRenderReadonlyEmpty({ value: value.value })
      : globalRenderReadonlyEmpty
        ? globalRenderReadonlyEmpty(options)
        : '-'
  }

  return {
    renderReadonly,
    renderReadonlyEmpty,
  }
}
