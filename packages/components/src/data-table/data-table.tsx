import type { DataTableProps } from 'naive-ui'
import type { SlotsType } from 'vue'
import type { ProCardProps } from '../card'
import type { ProDataTableInst } from './inst'
import type { ProDataTableSlots } from './slots'
import { NDataTable, NFlex } from 'naive-ui'
import { uid } from 'pro-components-hooks'
import { defineComponent } from 'vue'
import { resolveSlotWithProps, resolveWrappedSlot } from '../_utils/resolve-slot'
import { ProCard } from '../card'
import { useOmitProps, useOverrideProps } from '../composables'
import { ProSearchForm, useProSearchFormInst } from './components/search-form'
import DataTableSetting from './components/toolbar-setting/toolbar-setting'
import { useCheckedRowKeys } from './composables/useCheckedRowKeys'
import { useColumns } from './composables/useColumns'
import { useDataSource } from './composables/useDataSource'
import { useDataTableSize } from './composables/useDataTableSize'
import { useDraggableSort } from './composables/useDraggableSort'
import { useLoading } from './composables/useLoading'
import { useNDataTableInst } from './composables/useNDataTableInst'
import { usePagination } from './composables/usePagination'
import { useRowProps } from './composables/useRowProps'
import { useSearchForm } from './composables/useSearchForm'
import { useValueTypeForm } from './composables/useValueTypeForm'
import { provideProDataTableInst, provideProDataTableProps } from './context'
import { proDataTableExtendProps, proDataTableProps } from './props'

const name = 'ProDataTable'
export default defineComponent({
  name,
  props: proDataTableProps,
  slots: Object as SlotsType<ProDataTableSlots>,
  setup(props, { expose }) {
    const overridedProps = useOverrideProps(
      name,
      props,
    )

    const dataTableProps = useOmitProps(
      overridedProps,
      proDataTableExtendProps,
    )

    const dragHandleId = `drag-handle-${uid()}`

    const {
      sort,
      page,
      filter,
      filters,
      scrollTo,
      clearSorter,
      downloadCsv,
      clearFilter,
      clearFilters,
      nDataTableInst,
    } = useNDataTableInst()

    const [
      searchFormInst,
      { getFieldsTransformedValue },
    ] = useProSearchFormInst()

    const {
      loading,
      setLoading,
    } = useLoading(overridedProps)

    const {
      pagination,
      onUpdatePage,
      setPagination,
      onUpdatePageSize,
    } = usePagination(overridedProps)

    const {
      columns,
      getColumns,
      setColumns,
      getCacheColumns,
      setCacheColumns,
    } = useColumns(overridedProps, { pagination, dragHandleId })

    const {
      checkedRowKeys,
      setCheckedRowKeys,
      clearCheckedRowKeys,
    } = useCheckedRowKeys(overridedProps)

    const {
      data,
      fetchLoading,
      getTableData,
      setTableData,
      resolveRowKey,
      rowKeyToRowMap,
      reload,
    } = useDataSource(overridedProps, {
      pagination,
      setPagination,
      clearCheckedRowKeys,
      getFieldsTransformedValue,
    })

    const { rowProps } = useRowProps(overridedProps, {
      resolveRowKey,
      checkedRowKeys,
      setCheckedRowKeys,
      clearCheckedRowKeys,
    })

    const {
      show: showSearchForm,
      proSearchFormProps,
    } = useSearchForm(overridedProps, { reload })

    const {
      size,
      setSize: setTableSize,
    } = useDataTableSize(overridedProps)

    useDraggableSort(
      overridedProps,
      {
        data,
        dragHandleId,
      },
    )

    useValueTypeForm()

    const nDataTableProps = computed<DataTableProps>(() => {
      return {
        ...dataTableProps.value,
        rowProps,
        'remote': true,
        'data': data.value,
        'size': size.value,
        'rowKey': resolveRowKey,
        'loading': loading.value,
        'columns': columns.value,
        'pagination': pagination.value,
        'checkedRowKeys': checkedRowKeys.value,
        'onUpdatePage': updatePageAndReloadTable,
        'onUpdateCheckedRowKeys': setCheckedRowKeys,
        'onUpdatePageSize': updatePageSizeAndReloadTable,

        'onUpdate:page': undefined,
        'onUpdate:pageSize': undefined,
        'onUpdate:checkedRowKeys': undefined,
      }
    })

    const searchCardProps = computed<ProCardProps>(() => {
      return {
        ...(overridedProps.value.searchCardProps ?? {}),
      }
    })

    const headerCardProps = computed<ProCardProps>(() => {
      const {
        title,
        tooltip,
        tableCardProps,
      } = overridedProps.value

      return {
        title,
        tooltip,
        triggerAreas: [],
        segmented: false,
        showCollapse: false,
        ...(tableCardProps ?? {}),
      }
    })

    function updatePageAndReloadTable(page: number) {
      onUpdatePage(page)
      reload()
    }

    function updatePageSizeAndReloadTable(pageSize: number) {
      onUpdatePageSize(pageSize)
      reload()
    }

    watch(
      fetchLoading,
      setLoading,
    )

    const exposed: ProDataTableInst = {
      sort,
      page,
      reload,
      filter,
      filters,
      scrollTo,
      setLoading,
      getColumns,
      setColumns,
      clearFilter,
      clearSorter,
      downloadCsv,
      clearFilters,
      getTableData,
      setTableSize,
      setTableData,
      setPagination,
      getCacheColumns,
      setCacheColumns,
      getTableSize: () => size.value,
      getPagination: () => pagination.value,
      getRowKeyToRowMap: () => rowKeyToRowMap.value,
      getSearchFormInst: () => searchFormInst.value!,
    }

    expose(exposed)
    provideProDataTableInst(exposed)
    provideProDataTableProps(overridedProps)

    return {
      pagination,
      nDataTableInst,
      searchFormInst,
      showSearchForm,
      nDataTableProps,
      searchCardProps,
      headerCardProps,
      proSearchFormProps,
    }
  },
  render() {
    return (
      <div>
        {
          [
            this.showSearchForm && (
              <ProCard {...this.searchCardProps}>
                <ProSearchForm
                  ref="searchFormInst"
                  {...this.proSearchFormProps}
                  v-slots={this.$slots}
                />
              </ProCard>
            ),
            <ProCard {...this.headerCardProps}>
              {{
                'header': this.$slots.title,
                'header-extra': () => {
                  return (
                    <NFlex align="center">
                      {this.$slots.toolbar?.()}
                      <DataTableSetting />
                    </NFlex>
                  )
                },
                'default': () => {
                  const tableDom = (
                    <NDataTable
                      ref="nDataTableInst"
                      {...this.nDataTableProps}
                      v-slots={this.$slots}
                    />
                  )
                  return [
                    resolveWrappedSlot(this.$slots.extra, (children) => {
                      return children
                        ? <div style={{ marginBlockEnd: '16px' }}>{children}</div>
                        : null
                    }),
                    resolveSlotWithProps(this.$slots.table, { tableDom }, () => tableDom),
                  ]
                },
              }}
            </ProCard>,
          ]
        }
      </div>
    )
  },
})
