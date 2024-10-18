import type { DataTableBaseColumn, DataTableColumn } from 'naive-ui'
import type { VNodeChild } from 'vue'
import { cloneDeep, isFunction } from 'lodash-es'
import { onMounted, ref } from 'vue'
import { indexColumnKey, sortColumnKey } from '../../../composables/useColumnRenderer'
import { useInjectProDataTableInst } from '../../../context'

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
  } = useInjectProDataTableInst()!

  function restoreList() {
    list.value = cloneDeep(initialList)
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
    return !column.type
      && !!column.title
      && !!String(column.key)
      && column.key !== sortColumnKey
      && column.key !== indexColumnKey
  }

  function sortTableColumnsByList() {
    const tableColumns = [...getCacheColumns()]
    let startIndex = tableColumns.filter(pattern).length - 1
    list.value.forEach((item) => {
      const index = tableColumns.findIndex(column => !column.type && column.key === item.key)
      if (~index) {
        const column = tableColumns[index]
        tableColumns.splice(index, 1)
        tableColumns.splice(startIndex++, 0, column)
      }
    })
    console.log(tableColumns)
    setColumns(tableColumns)
    setCacheColumns(tableColumns)
  }

  onMounted(() => {
    const tableColumns = [...getCacheColumns()]
    const matchedColumns = tableColumns.filter(pattern) as DataTableBaseColumn[]
    initialList = matchedColumns.map(convertTableColumnToColumnItem)
    list.value = cloneDeep(initialList)
  })

  return {
    restoreList,
    sortTableColumnsByList,
    list: list as any as Ref<ColumnItem[]>,
  }
}
