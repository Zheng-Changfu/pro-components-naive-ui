import type { DataTableColumn, PaginationProps } from 'naive-ui'
import type { ComputedRef } from 'vue'
import type { ProDataTableProps } from '../props'
import type { ProDataTableColumn, ProDataTableColumns } from '../types'
import { watchImmediate } from '@vueuse/core'
import { mapTree } from 'pro-components-hooks'
import { computed } from 'vue'
import { useInjectGlobalConfig } from '../../config-provider'
import { useLocale } from '../../locales'

export const indexColumnKey = '__INDEX_COLUMN__'

interface UseColumnsOptions {
  pagination: ComputedRef<PaginationProps | false>
}
export function useColumns(props: ComputedRef<ProDataTableProps>, options: UseColumnsOptions) {
  const { pagination } = options
  let cacheColumns: DataTableColumn[] = []
  const columns = ref<DataTableColumn[]>([])
  const { getMessage } = useLocale('ProDataTable')
  const { valueTypeMap } = useInjectGlobalConfig()

  const hasFixedLeftColumn = computed(() => {
    return columns.value.some(column => column.fixed === 'left')
  })

  watchImmediate(
    () => props.value.columns ?? [],
    (v) => {
      columns.value = resolveColumns(v)
      cacheColumns = columns.value
    },
  )

  function createIndexColumn(column: ProDataTableColumn | undefined): DataTableColumn {
    return {
      title: getMessage('indexColumn'),
      key: indexColumnKey,
      width: 60,
      align: 'center',
      fixed: hasFixedLeftColumn.value ? 'left' : undefined,
      render(_, rowIndex) {
        /**
         * TODO: render
         */
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

  function getCacheColumns() {
    return cacheColumns
  }

  function setCacheColumns(values: ProDataTableColumn[] | DataTableColumn[]) {
    cacheColumns = resolveColumns(values as ProDataTableColumn[])
  }

  function setColumns(values: ProDataTableColumn[] | DataTableColumn[]) {
    columns.value = resolveColumns(values as ProDataTableColumn[])
  }

  return {
    setColumns,
    getColumns,
    getCacheColumns,
    setCacheColumns,
    columns: computed(() => {
      console.log('update')
      return columns.value
    }),
  }
}
