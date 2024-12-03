import type { ExtractPublicPropTypes, SlotsType, VNodeChild } from 'vue'
import type { ProDataTableProps } from '../../data-table'
import type { ProEditDataTableInst } from '../inst'
import type { ProEditDataTableSlots } from '../slots'
import { useInjectListField } from 'pro-composables'
import { computed, defineComponent, watch } from 'vue'
import { keep } from '../../_utils/keep'
import { resolveSlotWithProps } from '../../_utils/resolveSlot'
import { simplyOmit } from '../../_utils/simplyOmit'
import { ProDataTable } from '../../data-table'
import { proDataTablePropKeys } from '../../data-table/props'
import { proFieldProps, useInjectProForm } from '../../form'
import { provideProEditDataTableInst } from '../context'
import { useInjectEditDataTableInstStore } from '../inst'
import { proEditDataTableProps } from '../props'
import { useColumns } from './composables/useColumns'
import { useEditable } from './composables/useEditable'
import { useProDataTableInst } from './composables/useProDataTableInst'
import CreatorButton from './creator-button'

const editDataTableProps = {
  ...simplyOmit(
    proEditDataTableProps,
    Object.keys(proFieldProps) as any,
  ) as Omit<typeof proEditDataTableProps, keyof typeof proFieldProps>,
} as const

export type EditDataTableProps = ExtractPublicPropTypes<typeof editDataTableProps>

export default defineComponent({
  name: 'EditDataTable',
  props: editDataTableProps,
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
    // provide(proFormListContextKey, {
    //   showLabel: false,
    // })
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
