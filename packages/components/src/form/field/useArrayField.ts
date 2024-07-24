import { createArrayField, useCompile } from 'pro-components-hooks'
import { computed, toRef, useSlots } from 'vue'
import type { ProFormListProps } from '../../form-list/props'
import type { ProFieldConfig } from './fieldCustomKeys'
import { proFieldConfigKey } from './fieldCustomKeys'
import type { ProFieldProps } from './props'

export function useArrayField(
  name: `Pro${string}`,
  props: ProFormListProps,
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

  const field = createArrayField({
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

  const nFormItemPath = field.stringPath
  const nFormItemLabel = useCompile(toRef(props, 'label'), { scope: field.scope })

  const nFormItemMeta = computed(() => {
    return {
      path: nFormItemPath.value,
      label: nFormItemLabel.value,
    }
  })

  field[proFieldConfigKey] = {
    name,
    slots,
    nFormItemMeta,
    value: computed(() => field.value.value),
  } as ProFieldConfig

  return field
}
