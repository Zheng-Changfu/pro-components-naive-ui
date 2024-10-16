import type { DataTableRowKey } from 'naive-ui'
import type { ProDataTableProps } from '../props'

interface UseRowPropsOptions {
  clearCheckedRowKeys: () => void
  resolveRowKey: (row: any) => any
  checkedRowKeys: ComputedRef<DataTableRowKey[]>
  setCheckedRowKeys: (keys: DataTableRowKey[], rows?: any, meta?: any) => void
}

const trKey = '_row-key'
export function useRowProps(props: ComputedRef<ProDataTableProps>, options: UseRowPropsOptions) {
  const {
    resolveRowKey,
    checkedRowKeys,
    setCheckedRowKeys,
    clearCheckedRowKeys,
  } = options

  const hasSelectionColumn = computed(() => {
    const { columns = [] } = props.value
    return columns.length > 0 && columns.some(column => column.type === 'selection')
  })

  const isRadioSelectionColumn = computed(() => {
    const { columns = [] } = props.value
    return columns.length > 0 && columns.some(column => column.type === 'selection' && column.multiple === false)
  })

  function rowProps(row: any) {
    const {
      rowProps = {} as any,
      clickRowToSelect,
    } = props.value

    const rowKey = resolveRowKey(row)

    return {
      ...rowProps,
      [trKey]: rowKey,
      onClick: (e: MouseEvent) => {
        rowProps.onClick?.(e)

        if (clickRowToSelect === false) {
          return
        }
        if (!hasSelectionColumn.value) {
          return
        }

        const tr = e.composedPath().find(dom => (dom as HTMLElement).tagName === 'TR') as HTMLElement
        if (!tr) {
          return
        }
        e.stopPropagation()

        if (isRadioSelectionColumn.value) {
          const radioBox = tr.querySelector('input[type=radio]')
          if (radioBox && !radioBox.hasAttribute('disabled')) {
            clearCheckedRowKeys()
            setCheckedRowKeys([rowKey])
          }
        }
        else {
          const checkBox = tr.querySelector('div[role=checkbox]')
          if (checkBox && [...checkBox.classList].every(className => !className.endsWith('disabled'))) {
            if (!checkedRowKeys.value.includes(rowKey)) {
              setCheckedRowKeys([...checkedRowKeys.value, rowKey])
              return
            }
            setCheckedRowKeys(checkedRowKeys.value.filter(key => key !== rowKey))
          }
        }
      },
    }
  }

  return {
    rowProps,
  }
}
