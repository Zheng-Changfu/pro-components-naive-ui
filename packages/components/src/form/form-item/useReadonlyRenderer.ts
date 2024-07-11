import type { ProFieldConfig } from '../field'
import { useInjectGlobalConfigContext } from '../../config-provider'
import type { ProFormItemProps } from './props'

export function useReadonlyRenderer(props: ProFormItemProps, options: ProFieldConfig) {
  const { value } = options
  const { proForm } = useInjectGlobalConfigContext()

  function readonlyRender() {
    const { readonlyRender: propReadonlyRender } = props
    const { readonlyRender: globalReadonlyRender } = proForm

    return propReadonlyRender
      ? propReadonlyRender({ value: value.value })
      : globalReadonlyRender
        ? globalReadonlyRender(options)
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
    readonlyRender,
    readonlyEmptyRender,
  }
}
