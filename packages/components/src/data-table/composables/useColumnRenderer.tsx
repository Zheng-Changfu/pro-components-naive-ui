import type { ProDataTableColumn, ProTableBaseColumn } from '../types'
import { DragOutlined } from '@vicons/antd'
import { isFunction } from 'lodash-es'
import { type DataTableColumn, NButton, NIcon, type PaginationProps } from 'naive-ui'
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

  function createIndexColumn(column: ProDataTableColumn | undefined): DataTableColumn {
    const {
      key,
      path,
      render,
      valueType,
      fieldProps,
      fieldSlots,
      ...rest
    } = column as any ?? {}

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

  function createDragSortColumn(column: ProDataTableColumn | undefined): DataTableColumn {
    const {
      key,
      path,
      render,
      valueType,
      fieldProps,
      fieldSlots,
      ...rest
    } = column as any ?? {}

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
                style={{ cursor: 'move' }}
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

  function createValueTypeColumn(column: ProTableBaseColumn): DataTableColumn {
    const {
      key,
      path,
      render,
      valueType,
      fieldProps,
      fieldSlots,
      ...rest
    } = column ?? {}

    return {
      ...rest,
      key: path ?? key,
      render(row, rowIndex) {
        if (render) {
          return render(row, rowIndex)
        }
        const Component = unref(valueTypeMap)[valueType!]
        const props = isFunction(fieldProps) ? fieldProps(row, rowIndex) : (fieldProps ?? {})
        return Component
          ? h(Component, props, fieldSlots)
          : null
      },
    }
  }

  return {
    createIndexColumn,
    createDragSortColumn,
    createValueTypeColumn,
  }
}
