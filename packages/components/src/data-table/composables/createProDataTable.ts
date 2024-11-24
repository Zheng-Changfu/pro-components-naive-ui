import type { DataTableInst } from 'naive-ui'
import type { RefreshOnWindowFocus } from '../../composables/useFetchData'
import { Merge } from 'type-fest'
import { computed, ref } from 'vue'

/**
 * 接管数据源的 composable
 */

export interface CreateProDataTableReturn<RowData = any> {

}

interface CreateProDataTableOptions<RowData = any> {
  /**
   * 是否自动创建 row-key
   * @default false
   */
  autoCreateRowKey?: boolean
  /**
   * 表格每一行的 key，优先级大于 autoCreateRowKey
   */
  rowKey?: string | ((row: RowData) => string | number)
  /**
   * 是否手动调用 request，设置后不会调用 request
   * @default false
   */
  manual?: boolean
  /**
   * 屏幕聚焦刷新请求
   * @default true
   */
  refreshOnWindowFocus?: RefreshOnWindowFocus
  /**
   * 请求函数
   */
  request?: RequestFn
  /**
   * 请求失败触发的函数
   */
  onRequestError?: (err: Error) => void
  /**
   * 请求成功触发的函数
   */
  onRequestSuccess?: (res: Awaited<ReturnType<RequestFn>>) => void
  /**
   * 请求完成后触发的函数，不论成功或失败
   */
  onRequestComplete?: () => void
}
export function createProDataTable<RowData = any>(options: CreateProDataTableOptions<RowData> = {}) {
  const loading = ref(false)
  const dataSource = ref<RowData[]>()
  const nDataTableInst = ref<DataTableInst>()

  function insert() {

  }

  function remove() {

  }

  function updateRow() {

  }

  function findRow() {

  }

  const finalDataSource = computed(() => {

  })

  const rowKeyToRowMap = computed(() => {

  })

  const returned = {
    insert,
    remove,
    findRow,
    loading,
    updateRow,
    data: finalDataSource,
  }

  return Object.freeze(returned)
}
