import type { DataTableColumn } from 'naive-ui'
import type { TableColumnGroupTitle, TableColumnTitle, TableExpandColumnTitle } from 'naive-ui/es/data-table/src/interface'
import type { ComputedRef } from 'vue'
import type { ProDataTableProps } from '../props'
import type { ProDataTableBaseColumn, ProDataTableIndexColumn } from '../types'
import { DragOutlined, InfoCircleOutlined } from '@vicons/antd'
import { get, isFunction } from 'lodash-es'
import { NButton, NIcon } from 'naive-ui'
import { computed } from 'vue'
import ProTooltip from '../../_internal/components/pro-tooltip'
import { isEmptyValue } from '../../_utils/isEmptyValue'
import { useInjectGlobalConfig, useInjectWrappedIn } from '../../config-provider'
import { useLocale } from '../../locales'

export const sortColumnKey = '__SORT_COLUMN__'
export const indexColumnKey = '__INDEX_COLUMN__'

interface CreateColumnRendererOptions {
  dragHandleId: string
  props: ComputedRef<ProDataTableProps>
}
export function useColumnRenderer(options: CreateColumnRendererOptions) {
  const {
    props,
    dragHandleId,
  } = options

  const {
    getMessage,
  } = useLocale('ProDataTable')

  const {
    mergedEmpty,
  } = useInjectGlobalConfig()

  const wrappedIn = useInjectWrappedIn()

  const emptyText = computed(() => {
    return mergedEmpty(wrappedIn)
  })

  const hasFixedLeftColumn = computed(() => {
    const columns = props.value.columns ?? []
    return columns.some(column => column.fixed === 'left')
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
              <div style={{
                cursor: 'pointer',
                display: 'inline-block',
              }}
              >
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
        if (props.value.pagination === false) {
          const index = rowIndex + 1
          return render
            ? render(index, row, rowIndex)
            : index
        }
        const page = Math.max(1, props.value.pagination?.page ?? 1)
        const pageSize = Math.max(1, props.value.pagination?.pageSize ?? 10)
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
              <div
                class={dragHandleId}
                onClick={e => e.stopPropagation()}
              >
                {render(row, rowIndex)}
              </div>
            )
          : (
              <NButton
                text={true}
                class={dragHandleId}
                style={{ cursor: 'move', verticalAlign: 'middle' }}
                onClick={e => e.stopPropagation()}
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

  function createBaseColumn(column: ProDataTableBaseColumn): DataTableColumn {
    const {
      key,
      path,
      title,
      render,
      tooltip,
      ...rest
    } = column ?? {}

    const columnKey = path ?? key ?? ''
    return {
      key: columnKey,
      title: renderTooltipTitle(title, tooltip),
      render(row, rowIndex) {
        if (render) {
          /**
           * 用户自己的 render 不处理
           */
          return render(row, rowIndex)
        }
        const value = get(row, columnKey)
        return isEmptyValue(value) ? emptyText.value : value
      },
      ...rest,
    }
  }

  return {
    createBaseColumn,
    createIndexColumn,
    renderTooltipTitle,
    createDragSortColumn,
  }
}
