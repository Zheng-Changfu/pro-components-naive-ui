import type { PaginationProps } from 'naive-ui'
import type { ComputedRef } from 'vue'
import type { ProDataTableProps } from '../props'
import type { ProDataTableColumn, ProDataTableColumns } from '../types'
import { watchImmediate } from '@vueuse/core'
import { mapTree } from 'pro-components-hooks'
import { computed } from 'vue'
import { useLocale } from '../../locales'

const indexColumnKey = '__INDEX_COLUMN__'

interface UseColumnsOptions {
  pagination: ComputedRef<PaginationProps | false>
}
export function useColumns(props: ComputedRef<ProDataTableProps>, options: UseColumnsOptions) {
  const { pagination } = options
  const columns = ref<ProDataTableColumns>([])
  const { getMessage } = useLocale('ProDataTable')

  watchImmediate(
    computed(() => props.value.columns ?? []),
    v => columns.value = normalizeColumns(v),
  )

  watchImmediate(
    computed(() => props.value.indexColumn),
    (v) => {
      if (v === false) {
        removeColumn(indexColumnKey)
        return
      }
      const indexColumn = createIndexColumn(v)
      columns.value.unshift(indexColumn)
    },
  )

  const hasFixedLeftColumn = computed(() => {
    return columns.value.some(column => column.fixed === 'left')
  })

  function createIndexColumn(column: ProDataTableColumn | undefined): ProDataTableColumn {
    return {
      title: getMessage('indexColumnText'),
      key: indexColumnKey,
      width: 60,
      align: 'center',
      fixed: hasFixedLeftColumn.value ? 'left' : undefined,
      render(_, rowIndex) {
        if (pagination.value === false) {
          return rowIndex + 1
        }
        const page = Math.max(1, pagination.value.page ?? 1)
        const pageSize = Math.max(1, pagination.value.pageSize ?? 10)
        return (page - 1) * pageSize + rowIndex + 1
      },
      ...(column as any ?? {}),
    }
  }

  function findColumnIndex(key: string | number) {
    // @ts-ignore
    return columns.value.findIndex(column => column.key === key || column.path === key)
  }

  function removeColumn(key: string | number) {
    const index = findColumnIndex(key)
    if (~index) {
      columns.value.splice(index, 1)
    }
  }

  function normalizeColumns(columns: ProDataTableColumns) {
    return mapTree(
      columns,
      (item) => {
        const { path, key, ...rest } = item as any
        return {
          ...rest,
          key: path ?? key,
        }
      },
      (props.value.childrenKey ?? 'children') as any,
    )
  }

  return {
    columns: computed(() => columns.value),
  }
}
