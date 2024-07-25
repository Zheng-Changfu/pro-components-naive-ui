import type { ProFieldConfig } from '../field'
import { useInjectGlobalConfig } from '../../config-provider'
import type { ProFormItemProps } from './props'

export function useReadonlyRenderer(props: ProFormItemProps, options: ProFieldConfig) {
  const { value } = options
  const { proForm } = useInjectGlobalConfig()

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
