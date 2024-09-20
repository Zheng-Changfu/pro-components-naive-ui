import type { DataTableProps } from 'naive-ui'
import { defineComponent } from 'vue'
import { call } from '../_utils/call'
import { useOmitProps, useOverrideProps } from '../composables'
import { useProSearchFormInst } from './components/search-form'
import { useCheckedRowKeys } from './composables/useCheckedRowKeys'
import { useColumns } from './composables/useColumns'
import { useDataSource } from './composables/useDataSource'
import { useExpandedRowKeys } from './composables/useExpandedRowKeys'
import { useLoading } from './composables/useLoading'
import { usePagination } from './composables/usePagination'
import { useRowProps } from './composables/useRowProps'
import { useSearchForm } from './composables/useSearchForm'
import { useSimplePagination } from './composables/useSimplePagination'
import { proDataTableExtendProps, proDataTableProps } from './props'

const name = 'ProDataTable'
export default defineComponent({
  name,
  props: proDataTableProps,
  slots: {},
  setup(props, { expose }) {
    const [searchFormInst, {
      getFieldsTransformedValue,
    }] = useProSearchFormInst()

    const overridedProps = useOverrideProps(
      name,
      props,
    )

    const dataTableProps = useOmitProps(
      overridedProps,
      proDataTableExtendProps,
    )

    const {
      loading,
      setLoading,
    } = useLoading(overridedProps)

    const {
      pagination,
      setPagination,
    } = usePagination(overridedProps)

    const {
      columns,
    } = useColumns(overridedProps, { pagination })

    const {
      checkedRowKeys,
      setCheckedRowKeys,
      clearCheckedRowKeys,
      removeCheckedRowKey,
    } = useCheckedRowKeys(overridedProps)

    const {
      expandedRowKeys,
      setExpandedRowKeys,
    } = useExpandedRowKeys(overridedProps)

    const {
      rowProps,
    } = useRowProps(overridedProps)

    const {
      data,
      fetchLoading,
      resolveRowKey,
      rowKeyToRowMap,
      reload,
    } = useDataSource(overridedProps, {
      pagination,
      setPagination,
      getFieldsTransformedValue,
    })

    const {
      show: showSearchForm,
      proSearchFormProps,
    } = useSearchForm(overridedProps, { reload })

    const {
      toPrevPageAndReloadTable,
      toNextPageAndReloadTable,
    } = useSimplePagination(overridedProps, { reload })

    const nDataTableProps = computed<DataTableProps>(() => {
      return {
        ...dataTableProps.value,
        'remote': true,
        'data': data.value,
        'rowKey': resolveRowKey,
        'loading': loading.value,
        'columns': columns.value,
        'rowProps': rowProps.value,
        'pagination': pagination.value,
        'checkedRowKeys': checkedRowKeys.value,
        'expandedRowKeys': expandedRowKeys.value,
        'onUpdatePage': updatePageAndReloadTable,
        'onUpdateCheckedRowKeys': setCheckedRowKeys,
        'onUpdateExpandedRowKeys': setExpandedRowKeys,
        'onUpdatePageSize': updatePageSizeAndReloadTable,

        'onUpdate:page': undefined,
        'onUpdate:pageSize': undefined,
        'onUpdate:checkedRowKeys': undefined,
        'onUpdate:expandedRowKeys': undefined,
      }
    })

    function updatePageAndReloadTable(page: number) {
      const {
        onUpdatePage,
        'onUpdate:page': _onUpdatePage,
      } = overridedProps.value

      if (onUpdatePage) {
        call(onUpdatePage, page)
        return
      }
      if (_onUpdatePage) {
        call(_onUpdatePage, page)
        return
      }

      setPagination({ page })
      reload()
    }

    function updatePageSizeAndReloadTable(pageSize: number) {
      const {
        onUpdatePageSize,
        'onUpdate:pageSize': _onUpdatePageSize,
      } = overridedProps.value

      if (onUpdatePageSize) {
        call(onUpdatePageSize, pageSize)
        return
      }
      if (_onUpdatePageSize) {
        call(_onUpdatePageSize, pageSize)
        return
      }

      setPagination({ page: 1, pageSize })
      reload()
    }

    watch(fetchLoading, setLoading)

    const exposed = {

    }

    return {
      nDataTableProps,
    }
  },
  render() {

  },
})
