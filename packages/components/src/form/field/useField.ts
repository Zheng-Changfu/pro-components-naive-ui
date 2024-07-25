import { createField, useCompile } from 'pro-components-hooks'
import { toRef, useSlots } from 'vue'
import type { ProFormItemProps } from '../form-item'
import { proFieldConfigKey } from './fieldCustomKeys'
import type { ProFieldProps } from './props'

export function useField(
  componentName: `Pro${string}`,
  props: ProFieldProps & ProFormItemProps,
  options: ProFieldProps = {},
) {
  const slots = useSlots()
  const {
    preserve,
    onChange,
    postState,
    transform,
    defaultValue,
    dependencies,
    initialValue,
  } = props

  const field = createField({
    preserve,
    defaultValue,
    initialValue,
    dependencies,
    path: toRef(props, 'path'),
    value: toRef(props, 'value'),
    hidden: toRef(props, 'hidden'),
    visible: toRef(props, 'visible'),
    onChange,
    transform,
    postState,
    ...(options as any),
  })

  field[proFieldConfigKey] = {}
  field[proFieldConfigKey].slots = slots
  field[proFieldConfigKey].value = field.value
  field[proFieldConfigKey].name = componentName

  field.scope.$path = field.stringPath
  field.scope.$label = useCompile(toRef(props, 'label'), { scope: field.scope })

  return field
}
