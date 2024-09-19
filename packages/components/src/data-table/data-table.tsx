import type { DataTableProps } from 'naive-ui'
import { defineComponent } from 'vue'
import { useOmitProps, useOverrideProps } from '../composables'
import { useCheckedRowKeys } from './composables/useCheckedRowKeys'
import { useColumns } from './composables/useColumns'
import { useExpandedRowKeys } from './composables/useExpandedRowKeys'
import { useLoading } from './composables/useLoading'
import { usePagination } from './composables/usePagination'
import { useRowProps } from './composables/useRowProps'
import { proDataTableExtendProps, proDataTableProps } from './props'

const name = 'ProDataTable'
export default defineComponent({
  name,
  props: proDataTableProps,
  slots: {},
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

    const nDataTableProps = computed<DataTableProps>(() => {
      return {
        ...dataTableProps.value,
        'loading': loading.value,
        'columns': columns.value,
        'rowProps': rowProps.value,
        'pagination': pagination.value,
        'checkedRowKeys': checkedRowKeys.value,
        'expandedRowKeys': expandedRowKeys.value,
        'onUpdateCheckedRowKeys': setCheckedRowKeys,
        'onUpdateExpandedRowKeys': setExpandedRowKeys,

        'onUpdate:checkedRowKeys': undefined,
        'onUpdate:expandedRowKeys': undefined,
      }
    })

    const exposed = {

    }

    return {
      nDataTableProps,
    }
  },
  render() {

  },
})
