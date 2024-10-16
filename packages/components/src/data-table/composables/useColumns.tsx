import type { DataTableColumn, PaginationProps } from 'naive-ui'
import type { ComputedRef } from 'vue'
import type { ProDataTableProps } from '../props'
import type { ProDataTableColumn, ProDataTableColumns } from '../types'
import { watchImmediate } from '@vueuse/core'
import { mapTree } from 'pro-components-hooks'
import { computed } from 'vue'
import { useInjectGlobalConfig } from '../../config-provider'
import { useLocale } from '../../locales'

const indexColumnKey = '__INDEX_COLUMN__'

interface UseColumnsOptions {
  pagination: ComputedRef<PaginationProps | false>
}
export function useColumns(props: ComputedRef<ProDataTableProps>, options: UseColumnsOptions) {
  const { pagination } = options
  const columns = ref<DataTableColumn[]>([])
  const { getMessage } = useLocale('ProDataTable')
  const { valueTypeMap } = useInjectGlobalConfig()

  const hasFixedLeftColumn = computed(() => {
    return columns.value.some(column => column.fixed === 'left')
  })

  watchImmediate(
    () => props.value.columns ?? [],
    v => columns.value = resolveColumns(v),
  )

  function createIndexColumn(column: ProDataTableColumn | undefined): DataTableColumn {
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

  function resolveColumns(columns: ProDataTableColumns) {
    return mapTree(
      columns,
      (item) => {
        const {
          path,
          key,
          type,
          ...rest
        } = item as any

        return type === 'index'
          ? createIndexColumn(rest)
          : {
              type,
              ...rest,
              key: path ?? key,
            }
      },
      (props.value.childrenKey ?? 'children') as any,
    )
  }

  function getColumns() {
    return columns.value
  }

  function getCachedColumns() {
    return []
  }

  function matchColumns(match: (column: DataTableColumn, index: number) => boolean) {
    return columns.value.filter(match)
  }

  function moveColumn(from: number, to: number) {
    if (
      from >= 0
      && to >= 0
      && to < columns.value.length
      && from !== to
    ) {
      if (from < to) {
        const fromItem = columns.value[from]
        for (let i = from; i < to; i++)
          columns.value[i] = columns.value[i + 1]
        columns.value[to] = fromItem
      }
      else {
        const fromItem = columns.value[from]
        for (let i = from; i > to; i--)
          columns.value[i] = columns.value[i - 1]
        columns.value[to] = fromItem
      }
    }
  }

  return {
    moveColumn,
    getColumns,
    matchColumns,
    getCachedColumns,
    columns: computed(() => {
      console.log('update')
      return columns.value
    }),
  }
}
