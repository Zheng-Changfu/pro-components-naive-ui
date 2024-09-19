import type { ComputedRef } from 'vue'
import type { ProDataTableProps } from '../props'

export function useFieldSetting(props: ComputedRef<ProDataTableProps>) {
  return computed(() => {
    const {
      pageField = 'page',
      sizeField = 'size',
      listField = 'list',
      totalField = 'total',
    } = props.value.fieldSetting ?? {}

    return {
      pageField,
      sizeField,
      listField,
      totalField,
    }
  })
}
