import { toRef } from 'vue'
import type { ProFieldProps } from './props'

export function useGetProFieldProps<T extends ProFieldProps>(props: T) {
  const {
    preserve,
    onChange,
    postState,
    transform,
    dependencies,
    initialValue,
  } = props

  return {
    preserve,
    initialValue,
    dependencies,
    path: toRef(props, 'path'),
    value: toRef(props, 'value'),
    hidden: toRef(props, 'hidden'),
    visible: toRef(props, 'visible'),
    onChange,
    transform,
    postState,
  }
}
