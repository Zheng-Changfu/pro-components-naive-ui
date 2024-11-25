import type { DataTableProps } from 'naive-ui'
import type { SlotsType } from 'vue'
import type { ProCardProps } from '../card'
import type { ProDataTableInst } from './inst'
import type { ProDataTableSlots } from './slots'
import { NDataTable, NFlex } from 'naive-ui'
import { computed, defineComponent, provide } from 'vue'
import { useNaiveClsPrefix } from '../_internal/useClsPrefix'
import { useMountStyle } from '../_internal/useMountStyle'
import { resolveSlotWithProps, resolveWrappedSlot } from '../_utils/resolve-slot'
import { ProCard } from '../card'
import { useOmitProps, useOverrideProps } from '../composables'
import { ProSearchForm } from './components/search-form'
import DataTableSetting from './components/toolbar-setting/toolbar-setting'
import { useCheckedRowKeys } from './composables/useCheckedRowKeys'
import { useColumns } from './composables/useColumns'
import { useDataTableSize } from './composables/useDataTableSize'
import { useDraggableSort } from './composables/useDraggableSort'
import { useNDataTableInst } from './composables/useNDataTableInst'
import { useRowProps } from './composables/useRowProps'
import { proDataTableConfigKey } from './context'
import { proDataTableExtendProps, proDataTableProps } from './props'
import style from './styles/index.cssr'

const name = 'ProDataTable'
export default defineComponent({
  name,
  props: proDataTableProps,
  slots: Object as SlotsType<ProDataTableSlots>,
  setup(props, { slots, expose }) {
    const mergedClsPrefix = useNaiveClsPrefix()

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

    const {
      dragHandleId,
    } = useDraggableSort(overridedProps)

    const {
      columns,
      getColumns,
      setColumns,
      getCacheColumns,
      setCacheColumns,
    } = useColumns(overridedProps, { dragHandleId })

    const {
      checkedRowKeys,
      setCheckedRowKeys,
      clearCheckedRowKeys,
    } = useCheckedRowKeys(overridedProps)

    const { rowProps } = useRowProps(overridedProps, {
      checkedRowKeys,
      setCheckedRowKeys,
      clearCheckedRowKeys,
    })

    const {
      size,
      setSize: setTableSize,
    } = useDataTableSize(overridedProps)

    const nDataTableProps = computed<DataTableProps>(() => {
      return {
        ...dataTableProps.value,
        rowProps,
        'remote': true,
        'size': size.value,
        'columns': columns.value,
        'checkedRowKeys': checkedRowKeys.value,
        'onUpdateCheckedRowKeys': setCheckedRowKeys,
        'onUpdate:checkedRowKeys': undefined,
      }
    })

    /**
     * 包裹表格的卡片如果没有头部区域，则取消 padding
     */
    const unTableCardPadding = computed(() => {
      const {
        title,
        tooltip,
        tableCardProps = {},
      } = overridedProps.value

      return !title
        && !slots.title
        && !slots.toolbar
        && !(tableCardProps ?? {}).title
        && (!tooltip || tooltip.length <= 0)
        && (!tableCardProps.tooltip || tableCardProps.tooltip.length <= 0)
        && !tableCardProps.headerExtra
    })

    const nTableCardProps = computed<ProCardProps>(() => {
      const {
        title,
        tooltip,
        tableCardProps = {},
      } = overridedProps.value

      return {
        title,
        tooltip,
        triggerAreas: [],
        segmented: false,
        showCollapse: false,
        ...tableCardProps,
        contentStyle: {
          ...(unTableCardPadding.value ? { padding: 0 } : {}),
          // @ts-ignore
          ...(tableCardProps.contentStyle ?? {}),
        },
      }
    })

    useMountStyle(
      name,
      'pro-data-table',
      style,
    )

    const exposed: ProDataTableInst = {
      sort,
      page,
      filter,
      filters,
      scrollTo,
      clearFilter,
      clearSorter,
      downloadCsv,
      clearFilters,
    }

    expose(exposed)
    provide(proDataTableConfigKey, {
      getColumns,
      setColumns,
      setTableSize,
      getCacheColumns,
      setCacheColumns,
      tableSize: size,
      toolbarSetting: computed(() => overridedProps.value.toolbarSetting ?? {}),
    })
    return {
      nDataTableInst,
      nDataTableProps,
      nTableCardProps,
      mergedClsPrefix,
      searchFormProps: computed(() => overridedProps.value.searchFormProps ?? {}),
      searchCardProps: computed(() => overridedProps.value.searchCardProps ?? {}),
    }
  },
  render() {
    const { mergedClsPrefix } = this
    return (
      <div class={[
        `${mergedClsPrefix}-pro-data-table`,
        {
          [`${mergedClsPrefix}-pro-data-table--flex-height`]: this.flexHeight,
        },
      ]}
      >
        {
          [
            this.searchFormProps !== false && (
              <ProCard {...this.searchCardProps}>
                {/* @ts-ignore */}
                <ProSearchForm
                  ref="searchFormInst"
                  {...this.searchFormProps}
                  v-slots={this.$slots}
                />
              </ProCard>
            ),
            <ProCard {...this.nTableCardProps}>
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
