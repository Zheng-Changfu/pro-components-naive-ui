import type { DataTableColumn, PaginationProps } from 'naive-ui'
import type { TableColumnGroupTitle, TableColumnTitle, TableExpandColumnTitle } from 'naive-ui/es/data-table/src/interface'
import type { ProDataTableBaseColumn, ProDataTableIndexColumn } from '../types'
import { DragOutlined, InfoCircleOutlined } from '@vicons/antd'
import { get, isFunction } from 'lodash-es'
import { NButton, NEl, NIcon } from 'naive-ui'
import ProTooltip from '../../_internal/components/pro-tooltip'
import { useInjectGlobalConfig } from '../../config-provider'
import { useLocale } from '../../locales'

export const sortColumnKey = '__SORT_COLUMN__'
export const indexColumnKey = '__INDEX_COLUMN__'

interface CreateColumnRendererOptions {
  dragHandleId: string
  columns: Ref<DataTableColumn[]>
  pagination: ComputedRef<PaginationProps | false>
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

  const {
    valueTypeMap,
  } = useInjectGlobalConfig()

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
              <NEl style={{ cursor: 'pointer' }}>
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
              </NEl>
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
        const page = Math.max(1, pagination.value.page ?? 1)
        const pageSize = Math.max(1, pagination.value.pageSize ?? 10)
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
      render,
      ...rest
    } = column

    return {
      width: 60,
      align: 'center',
      key: sortColumnKey,
      title: getMessage('sortColumn'),
      fixed: hasFixedLeftColumn.value ? 'left' : undefined,
      render(row, index) {
        return render
          ? <div class={dragHandleId}>{render(row, index)}</div>
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
      ...rest
    } = column ?? {}

    const columnKey = path ?? key ?? ''
    return {
      key: columnKey,
      title: renderTooltipTitle(title, tooltip),
      render(row, rowIndex) {
        if (render) {
          return render(row, rowIndex)
        }
        const Component = unref(valueTypeMap)[valueType!]
        const value = columnKey ? get(row, columnKey) : undefined
        return Component
          ? h(Component, {
            value,
            simple: true,
            readonly: true,
            path: `builtinPath.${rowIndex}.${columnKey}`,
            fieldProps: isFunction(fieldProps) ? fieldProps(row, rowIndex) : (fieldProps ?? {}),
          }, fieldSlots)
          : value as any
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
