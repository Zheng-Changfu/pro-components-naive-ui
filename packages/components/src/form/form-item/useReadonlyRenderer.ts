import { useInjectFieldContext } from 'pro-components-hooks'
import { proFieldConfigKey } from '../field'
import { useInjectGlobalConfig } from '../../config-provider'
import type { ProFormItemProps } from './props'

export function useReadonlyRenderer(props: ProFormItemProps) {
  const field = useInjectFieldContext()!
  const { proForm } = useInjectGlobalConfig()
  const customFieldConfig = field[proFieldConfigKey]

  const {
    value,
    name: componentName,
  } = customFieldConfig

  function renderReadonly() {
    const { readonlyRenderers } = proForm
    const { renderReadonly: propRenderReadonly } = props
    const payload = { fullProps: props, value: value.value }

    if (propRenderReadonly) {
      return propRenderReadonly(payload)
    }
    if (readonlyRenderers) {
      const render = readonlyRenderers[componentName]
      if (render) {
        return render(payload)
      }
    }
    return value.value
  }

  function renderReadonlyEmpty() {
    const { readonlyEmptyRenderers } = proForm
    const { renderReadonlyEmpty: propRenderReadonlyEmpty } = props
    const payload = { fullProps: props, value: value.value }

    if (propRenderReadonlyEmpty) {
      return propRenderReadonlyEmpty(payload)
    }
    if (readonlyEmptyRenderers) {
      const render = readonlyEmptyRenderers[componentName]
      if (render) {
        return render(payload)
      }
    }
    return '-'
  }

  return {
    renderReadonly,
    renderReadonlyEmpty,
  }
}
