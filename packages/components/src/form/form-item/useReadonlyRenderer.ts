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

  function readonlyEmptyRender() {
    const { readonlyEmptyRender: propReadonlyEmptyRender } = props
    const { readonlyEmptyRender: globalReadonlyEmptyRender } = proForm

    return propReadonlyEmptyRender
      ? propReadonlyEmptyRender({ value: value.value })
      : globalReadonlyEmptyRender
        ? globalReadonlyEmptyRender(options)
        : '-'
  }

  return {
    renderReadonly,
    readonlyEmptyRender,
  }
}
