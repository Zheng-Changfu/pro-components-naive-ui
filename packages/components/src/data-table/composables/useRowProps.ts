import type { DataTableRowKey } from 'naive-ui'
import type { ComputedRef, Ref } from 'vue'
import type { ProDataTableProps } from '../props'
import { computed } from 'vue'

interface UseRowPropsOptions {
  checkedRowKeys: Ref<DataTableRowKey[]>
  setCheckedRowKeys: (keys: DataTableRowKey[], rows?: any, meta?: any) => void
}

const trKey = '_row-key'
export function useRowProps(props: ComputedRef<ProDataTableProps>, options: UseRowPropsOptions) {
  const {
    checkedRowKeys,
    setCheckedRowKeys,
  } = options

  const hasSelectionColumn = computed(() => {
    const { columns = [] } = props.value
    return columns.length > 0 && columns.some(column => column.type === 'selection')
  })

  const isRadioSelectionColumn = computed(() => {
    const { columns = [] } = props.value
    return columns.length > 0 && columns.some(column => column.type === 'selection' && column.multiple === false)
  })

  function rowProps(row: any, index: number) {
    const {
      rowKey,
      rowProps,
      clickRowToSelect,
    } = props.value

    const resolvedRowKey = rowKey ? rowKey(row) : undefined
    const resolvedRowProps = rowProps ? rowProps(row, index) : {}
    if (
      resolvedRowKey === undefined
      || clickRowToSelect === false
      || !hasSelectionColumn.value
    ) {
      return resolvedRowProps
    }
    const ignoreClassList = ['checkbox-box__border', 'radio-input']
    return {
      ...resolvedRowProps,
      [trKey]: resolvedRowKey,
      onClick: (e: MouseEvent) => {
        resolvedRowProps.onClick?.(e)
        const composedPath = e.composedPath()
        const className = ((composedPath[0]) as HTMLElement).className ?? ''
        if (ignoreClassList.some(ignoreClass => className.endsWith(ignoreClass))) {
          // 点击在了 checkbox/radio 上，防止事件触发2次
          return
        }
        const tr = composedPath.find(dom => (dom as HTMLElement).tagName === 'TR') as HTMLElement
        if (!tr) {
          return
        }
        e.stopPropagation()
        if (isRadioSelectionColumn.value) {
          const radioBox = tr.querySelector('input[type=radio]')
          if (radioBox && !radioBox.hasAttribute('disabled')) {
            if (!checkedRowKeys.value.includes(resolvedRowKey)) {
              setCheckedRowKeys([resolvedRowKey])
            }
            else {
              setCheckedRowKeys([])
            }
          }
        }
        else {
          const checkBox = tr.querySelector('div[role=checkbox]')
          if (checkBox && [...checkBox.classList].every(className => !className.endsWith('disabled'))) {
            if (!checkedRowKeys.value.includes(resolvedRowKey)) {
              setCheckedRowKeys([...checkedRowKeys.value, resolvedRowKey])
            }
            else {
              setCheckedRowKeys(checkedRowKeys.value.filter(key => key !== resolvedRowKey))
            }
          }
        }
      },
    }
  }

  return {
    rowProps,
  }
}
