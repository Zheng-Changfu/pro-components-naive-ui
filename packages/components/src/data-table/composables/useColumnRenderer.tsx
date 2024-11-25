import type { DataTableColumn, PaginationProps } from 'naive-ui'
import type { TableColumnGroupTitle, TableColumnTitle, TableExpandColumnTitle } from 'naive-ui/es/data-table/src/interface'
import type { ComputedRef, Ref } from 'vue'
import type { ProDataTableBaseColumn, ProDataTableIndexColumn } from '../types'
import { DragOutlined, InfoCircleOutlined } from '@vicons/antd'
import { isFunction, toString } from 'lodash-es'
import { NButton, NIcon } from 'naive-ui'
import { computed } from 'vue'
import ProTooltip from '../../_internal/components/pro-tooltip'
import { useLocale } from '../../locales'
import DataTableCell from '../components/data-table-cell'

export const sortColumnKey = '__SORT_COLUMN__'
export const indexColumnKey = '__INDEX_COLUMN__'

interface CreateColumnRendererOptions {
  dragHandleId: string
  columns: Ref<DataTableColumn[]>
  pagination: ComputedRef<PaginationProps | false | undefined>
}
export function useColumnRenderer(options: CreateColumnRendererOptions) {
  const {
    columns,
    pagination,
    dragHandleId,
  } = options

  const {
    getMessage,
  } = useLocale('ProDataTable')

  const hasFixedLeftColumn = computed(() => {
    return columns.value.some(column => column.fixed === 'left')
  })

  function renderTooltipTitle(
    title?: TableColumnTitle | TableExpandColumnTitle | TableColumnGroupTitle | undefined,
    tooltip?: string | string[],
  ): any {
    if (!title || !tooltip) {
      return title
    }
    return function (column: any) {
      const resolvedTitle = isFunction(title) ? title(column) : title
      if (!tooltip) {
        return resolvedTitle
      }
      return (
        <ProTooltip
          trigger="hover"
          tooltip={tooltip}
        >
          {{
            trigger: () => (
              <div style={{ cursor: 'pointer' }}>
                {resolvedTitle}
                <NIcon
                  size={18}
                  style={{
                    cursor: 'pointer',
                    display: 'inline',
                    verticalAlign: 'middle',
                    marginInlineStart: '4px',
                  }}
                >
                  <InfoCircleOutlined />
                </NIcon>
              </div>
            ),
          }}
        </ProTooltip>
      )
    }
  }

  function createIndexColumn(column: ProDataTableIndexColumn): DataTableColumn {
    const {
      type,
      render,
      ...rest
    } = column

    return {
      width: 60,
      align: 'center',
      key: indexColumnKey,
      title: getMessage('indexColumn'),
      fixed: hasFixedLeftColumn.value ? 'left' : undefined,
      render(row, rowIndex) {
        if (pagination.value === false) {
          const index = rowIndex + 1
          return render
            ? render(index, row, rowIndex)
            : index
        }
        const page = Math.max(1, pagination.value?.page ?? 1)
        const pageSize = Math.max(1, pagination.value?.pageSize ?? 10)
        const index = (page - 1) * pageSize + rowIndex + 1
        return render
          ? render(index, row, rowIndex)
          : index
      },
      ...rest,
    }
  }

  function createDragSortColumn(column: ProDataTableBaseColumn): DataTableColumn {
    const {
      key,
      path,
      title,
      render,
      tooltip,
      valueType,
      fieldProps,
      fieldSlots,
      proFieldProps,
      ...rest
    } = column

    return {
      width: 60,
      align: 'center',
      key: sortColumnKey,
      title: renderTooltipTitle(title ?? getMessage('sortColumn'), tooltip),
      fixed: hasFixedLeftColumn.value ? 'left' : undefined,
      render(row, rowIndex) {
        return render
          ? (
              <div class={dragHandleId}>
                <DataTableCell
                  row={row}
                  column={column}
                  rowIndex={rowIndex}
                  columnKey={sortColumnKey}
                />
              </div>
            )
          : (
              <NButton
                text={true}
                class={dragHandleId}
                style={{ cursor: 'move', verticalAlign: 'middle' }}
              >
                <NIcon size={16}>
                  <DragOutlined />
                </NIcon>
              </NButton>
            )
      },
      ...rest,
    }
  }

  function createValueTypeColumn(column: ProDataTableBaseColumn): DataTableColumn {
    const {
      key,
      path,
      title,
      render,
      tooltip,
      valueType,
      fieldProps,
      fieldSlots,
      proFieldProps,
      ...rest
    } = column ?? {}

    const columnKey = path ?? toString(key) ?? ''
    return {
      key: columnKey,
      title: renderTooltipTitle(title, tooltip),
      render(row, rowIndex) {
        return (
          <DataTableCell
            row={row}
            column={column}
            rowIndex={rowIndex}
            columnKey={columnKey}
          />
        )
      },
      ...rest,
    }
  }

  return {
    createIndexColumn,
    renderTooltipTitle,
    createDragSortColumn,
    createValueTypeColumn,
  }
}
