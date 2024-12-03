import type { SlotsType, VNodeChild } from 'vue'
import type { ProDataTableProps } from '../../data-table'
import type { ProEditDataTableInst } from '../inst'
import type { ProEditDataTableSlots } from '../slots'
import { useInjectListField } from 'pro-composables'
import { computed, defineComponent, provide, watch } from 'vue'
import { keep } from '../../_utils/keep'
import { resolveSlotWithProps } from '../../_utils/resolveSlot'
import { ProDataTable } from '../../data-table'
import { proDataTablePropKeys } from '../../data-table/props'
import { useInjectProForm } from '../../form'
import { proFieldConfigInjectionKey } from '../../form/components/field/context'
import { provideProEditDataTableInst } from '../context'
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
    const form = useInjectProForm()

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
      getEditable,
      startEditable,
      cancelEditable,
      cancelEditableAndRestore,
    } = useEditable(props)

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
      stringPath,
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

    /**
     * 长度发生变化，验证列表，如果没有传递规则，校验不会生效
     */
    watch(
      () => list.value.length,
      () => {
        form?.validate(stringPath.value)
      },
      { flush: 'post' },
    )

    const exposed: ProEditDataTableInst = {
      // #region
      /** pro-data-table 方法 start */
      sort,
      page,
      filter,
      filters,
      scrollTo,
      clearSorter,
      downloadCsv,
      clearFilter,
      clearFilters,
      /** pro-data-table 方法 end */
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
      getEditable,
      startEditable,
      cancelEditable,
      cancelEditableAndRestore,
    }

    registerInst(exposed)
    provideProEditDataTableInst(exposed)
    provide(proFieldConfigInjectionKey, {
      validateBehavior: computed(() => props.extraProFieldConfig?.validateBehavior ?? 'popover'),
      validateBehaviorProps: computed(() => props.extraProFieldConfig?.validateBehaviorProps),
    })
    return {
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
              <CreatorButton
                max={this.$props.max}
                actionGuard={this.$props.actionGuard}
                creatorButtonProps={this.$props.creatorButtonProps}
                creatorInitialValue={this.$props.creatorInitialValue}
              />,
            ]
            return resolveSlotWithProps(this.$slots.table, { tableDom: editTableDom }, () => editTableDom)
          },
        }}
      </ProDataTable>
    )
  },
})
