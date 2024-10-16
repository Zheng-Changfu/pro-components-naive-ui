import type { DataTableProps } from 'naive-ui'
import type { SlotsType } from 'vue'
import type { ProCardProps } from '../card'
import type { ProDataTableInst } from './inst'
import type { ProDataTableSlots } from './slots'
import { NDataTable, NFlex } from 'naive-ui'
import { defineComponent } from 'vue'
import { resolveWrappedSlot } from '../_utils/resolve-slot'
import { ProCard } from '../card'
import { useOmitProps, useOverrideProps } from '../composables'
import DataTableSetting from './components/data-table-setting/data-table-setting'
import { ProSearchForm, useProSearchFormInst } from './components/search-form'
import { useCheckedRowKeys } from './composables/useCheckedRowKeys'
import { useColumns } from './composables/useColumns'
import { useDataSource } from './composables/useDataSource'
import { useDataTableSize } from './composables/useDataTableSize'
import { useLoading } from './composables/useLoading'
import { useNDataTableInst } from './composables/useNDataTableInst'
import { usePagination } from './composables/usePagination'
import { useRowProps } from './composables/useRowProps'
import { useSearchForm } from './composables/useSearchForm'
import { provideProDataTableInst } from './context'
import { proDataTableExtendProps, proDataTableProps } from './props'

const name = 'ProDataTable'
export default defineComponent({
  name,
  props: proDataTableProps,
  inheritAttrs: false,
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
      moveColumn,
      getColumns,
      matchColumns,
    } = useColumns(overridedProps, { pagination })

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
      } = overridedProps.value

      return {
        title,
        tooltip,
        triggerAreas: [],
        segmented: false,
        showCollapse: false,
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
      moveColumn,
      setLoading,
      getColumns,
      clearFilter,
      clearSorter,
      downloadCsv,
      clearFilters,
      matchColumns,
      getTableData,
      setTableSize,
      setTableData,
      setPagination,
      getTableSize: () => size.value,
      getPagination: () => pagination.value,
      getRowKeyToRowMap: () => rowKeyToRowMap.value,
      getSearchFormInst: () => searchFormInst.value!,
    }

    expose(exposed)
    provideProDataTableInst(exposed)

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
    return [
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
          'default': () => [
            resolveWrappedSlot(
              this.$slots.extra,
              (children) => {
                if (!children) {
                  return null
                }
                return <div style={{ marginBlockEnd: '16px' }}>{children}</div>
              },
            ),
            <NDataTable
              ref="nDataTableInst"
              {...this.nDataTableProps}
              v-slots={this.$slots}
            />,
          ],
        }}
      </ProCard>,
    ]
  },
})
