import type { FieldDataTableProps } from '../field-data-table'
import { ref } from 'vue'

export function useDataSource(props: FieldDataTableProps) {
  const data = ref<any[]>([])
  
  

  return {
    data,
  }
}
