import type { ExtractPublicPropTypes, SlotsType, VNodeChild } from 'vue'
import type { ProButtonProps } from '../../button'
import type { ProDataTableProps } from '../../data-table'
import type { ProEditDataTableSlots } from '../slots'
import { omit } from 'lodash-es'
import { useInjectListFieldContext } from 'pro-composables'
import { resolveSlotWithProps } from '../../_utils/resolveSlot'
import { ProDataTable, proDataTableProps } from '../../data-table'
import { proFieldProps, useInjectProFormInst } from '../../form'
import { AUTO_CREATE_ID, proFormListContextKey } from '../../form-list'
import { provideProEditDataTableInst } from '../context'
import { type ProEditDataTableInst, useInjectEditDataTableInstStore } from '../inst'
import { proEditDataTableProps } from '../props'
import { useColumns } from './composables/useColumns'
import { useEditable } from './composables/useEditable'
import { useProDataTableContext } from './composables/useProDataTableContext'
import CreatorButton from './creator-button'

const editDataTableProps = {
  ...omit(
    proEditDataTableProps,
    Object.keys(proFieldProps),
  ) as Omit<typeof proEditDataTableProps, keyof typeof proFieldProps>,
  max: Number,
  value: {
    type: Array as PropType<Array<Record<string, any>>>,
    required: true,
  },
  creatorButtonProps: {
    type: [Object, Boolean] as PropType<ProButtonProps | false>,
    default: undefined,
  },
  onUpdateValue: Function,
  /**
   * -----有冲突的几个属性-------
   */
  size: {
    type: proDataTableProps.size.type,
    default: 'small',
  },
  title: proDataTableProps.title,
  tooltip: proDataTableProps.tooltip,
  /**
   * ------------
   */
} as const

export type EditDataTableProps = ExtractPublicPropTypes<typeof editDataTableProps>

export default defineComponent({
  name: 'EditDataTable',
  props: editDataTableProps,
  slots: Object as SlotsType<ProEditDataTableSlots>,
  setup(props) {
    const form = useInjectProFormInst()

    const {
      registerInst,
    } = useInjectEditDataTableInstStore()!

    const {
      methods,
      instRef: proDataTableInstRef,
    } = useProDataTableContext()

    const {
      columns,
    } = useColumns(props)

    const {
      getEditable,
      startEditable,
      cancelEditable,
      cancelEditableAndRestore,
    } = useEditable()

    const {
      pop,
      push,
      move,
      shift,
      insert,
      moveUp,
      remove,
      unshift,
      moveDown,
      onActionChange,
      stringPath,
    } = useInjectListFieldContext()!

    onActionChange((action) => {
      /**
       * 发生增删操作，验证列表
       */
      if ([
        'pop',
        'push',
        'shift',
        'insert',
        'remove',
        'unshift',
      ].includes(action)) {
        nextTick(() => {
          form?.validate(stringPath.value)
        })
      }
    })

    const proDataTableProps = computed<ProDataTableProps>(() => {
      const {
        max,
        value,
        actionGuard,
        onUpdateValue,
        tableCardProps,
        creatorButtonProps,
        creatorInitialValue,
        ...rest
      } = props

      return {
        ...rest,
        data: props.value,
        rowKey: AUTO_CREATE_ID,
        columns: columns.value,
        ref: proDataTableInstRef,
        tableCardProps: {
          bordered: false,
          ...(tableCardProps ?? {}),
        },
      }
    })

    const exposed: ProEditDataTableInst = {
      ...methods,
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
    provide(proFormListContextKey, {
      showLabel: false,
    })
    return {
      proDataTableProps,
    }
  },
  render() {
    return (
      <ProDataTable
        {...this.$attrs}
        {...this.proDataTableProps}
      >
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
