import type { DataTableBaseColumn, DataTableColumn } from 'naive-ui'
import type { Ref, VNodeChild } from 'vue'
import { cloneDeep, isFunction, isString } from 'lodash-es'
import { onMounted, ref } from 'vue'
import { indexColumnKey, sortColumnKey } from '../../../composables/useColumnRenderer'
import { useInjectProDataTableConfig } from '../../../context'

export interface ColumnItem {
  title: VNodeChild
  key: string | number
  fixed?: 'left' | 'right'
}

export function useColumnList() {
  const list = ref<ColumnItem[]>([])
  let initialList: ColumnItem[] = []

  const {
    setColumns,
    setCacheColumns,
    getCacheColumns,
  } = useInjectProDataTableConfig()

  function restoreList() {
    list.value = cloneDeep(initialList) as any
    sortTableColumnsByList()
  }

  function convertTableColumnToColumnItem(column: DataTableBaseColumn): ColumnItem {
    const {
      key,
      title,
      fixed,
    } = column
    return {
      key,
      fixed,
      title: isFunction(title) ? title(column) : title,
    }
  }

  function pattern(column: DataTableColumn) {
    /**
     * 不支持 tooltip title，不然 vueDraggablePlus 会报循环引用，相关 issue 也没解决，后续再看
     */
    return !column.type
      && !!String(column.key)
      && isString(column.title)
      && column.key !== sortColumnKey
      && column.key !== indexColumnKey
  }

  function sortTableColumnsByList() {
    const tableColumns = [...getCacheColumns()]
    let startIndex = tableColumns.filter(pattern).length
    list.value.forEach((item) => {
      const index = tableColumns.findIndex(column => !column.type && column.key === item.key)
      if (~index) {
        const column = tableColumns[index]
        tableColumns.splice(index, 1)
        tableColumns.splice(startIndex++, 0, column)
      }
    })
    setColumns(tableColumns)
    setCacheColumns(tableColumns)
  }

  onMounted(() => {
    const tableColumns = [...getCacheColumns()]
    const matchedColumns = tableColumns.filter(pattern) as DataTableBaseColumn[]
    initialList = matchedColumns.map(convertTableColumnToColumnItem)
    list.value = cloneDeep(initialList) as any
  })

  return {
    restoreList,
    sortTableColumnsByList,
    list: list as any as Ref<ColumnItem[]>,
  }
}
