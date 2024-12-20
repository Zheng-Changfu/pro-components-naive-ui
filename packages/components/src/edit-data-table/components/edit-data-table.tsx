import type { SlotsType, VNodeChild } from 'vue'
import type { ProDataTableProps } from '../../data-table'
import type { ProEditDataTableInst } from '../inst'
import type { ProEditDataTableSlots } from '../slots'
import { useInjectListField } from 'pro-composables'
import { computed, defineComponent, provide } from 'vue'
import { keep } from '../../_utils/keep'
import { resolveSlotWithProps } from '../../_utils/resolveSlot'
import { ProDataTable } from '../../data-table'
import { proDataTablePropKeys } from '../../data-table/props'
import { useFieldUtils } from '../../form'
import { proFieldConfigInjectionKey } from '../../form/components/field/context'
import { editDataTableInjectionKey, provideProEditDataTableInst } from '../context'
import { useInjectEditDataTableInstStore } from '../inst'
import { internalEditDataTableProps } from '../props'
import { useColumns } from './composables/useColumns'
import { useEditable } from './composables/useEditable'
import { useProDataTableInst } from './composables/useProDataTableInst'
import CreatorButton from './creator-button'

export default defineComponent({
  name: 'EditDataTable',
  props: {
    ...internalEditDataTableProps,
    extraProFieldConfig: Object,
  },
  slots: Object as SlotsType<ProEditDataTableSlots>,
  setup(props) {
    const {
      registerInst,
    } = useInjectEditDataTableInstStore()!

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
      proDataTableInst,
    } = useProDataTableInst()

    const {
      columns,
    } = useColumns(props)

    const {
      editableKeys,
    } = useEditable(props)

    const {
      readonly,
    } = useFieldUtils()

    const {
      get,
      set,
      pop,
      push,
      move,
      shift,
      insert,
      moveUp,
      remove,
      unshift,
      moveDown,
      value: list,
    } = useInjectListField()!

    const proDataTableProps = computed<ProDataTableProps>(() => {
      return {
        ...keep(props, proDataTablePropKeys),
        data: list.value,
        ref: proDataTableInst,
        columns: columns.value,
        tableCardProps: {
          bordered: false,
          ...(props.tableCardProps ?? {}),
        },
      }
    })

    const showCreatorButton = computed(() => {
      const { max, recordCreatorProps } = props
      return readonly.value !== true
        && recordCreatorProps !== false
        && list.value.length < (max ?? Number.POSITIVE_INFINITY)
    })

    const exposed: ProEditDataTableInst = {
      // #region pro-data-table 方法
      sort,
      page,
      filter,
      filters,
      scrollTo,
      clearSorter,
      downloadCsv,
      clearFilter,
      clearFilters,
      // #endregion
      get,
      set,
      pop,
      push,
      move,
      shift,
      insert,
      moveUp,
      remove,
      unshift,
      moveDown,
    }

    registerInst(exposed)
    provideProEditDataTableInst(exposed)
    provide(editDataTableInjectionKey, {
      editableKeys,
    })
    provide(proFieldConfigInjectionKey, {
      validateBehavior: computed(() => props.extraProFieldConfig?.validateBehavior ?? 'popover'),
      validateBehaviorProps: computed(() => props.extraProFieldConfig?.validateBehaviorProps),
    })
    return {
      showCreatorButton,
      proDataTableProps,
    }
  },
  render() {
    return (
      <ProDataTable {...this.proDataTableProps}>
        {{
          ...this.$slots,
          table: (params: { tableDom: VNodeChild }) => {
            const editTableDom = [
              params.tableDom,
              this.showCreatorButton && (
                <CreatorButton
                  rowKey={this.$props.rowKey}
                  actionGuard={this.$props.actionGuard}
                  recordCreatorProps={this.$props.recordCreatorProps}
                />
              ),
            ]
            return resolveSlotWithProps(this.$slots.table, { tableDom: editTableDom }, () => editTableDom)
          },
        }}
      </ProDataTable>
    )
  },
})
