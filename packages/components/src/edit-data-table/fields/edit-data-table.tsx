import type { ExtractPublicPropTypes, SlotsType, VNodeChild } from 'vue'
import type { ProButtonProps } from '../../button'
import type { ProDataTableProps } from '../../data-table'
import type { ProEditDataTableInst } from '../inst'
import type { ProEditDataTableSlots } from '../slots'
import { omit } from 'lodash-es'
import { useInjectListFieldContext } from 'pro-components-hooks'
import { toRef } from 'vue'
import { resolveSlotWithProps } from '../../_utils/resolve-slot'
import { ProDataTable, proDataTableProps } from '../../data-table'
import { proFieldProps, useInjectProFormInst } from '../../form'
import { AUTO_CREATE_ID, proFormListContextKey } from '../../form-list'
import { provideProEditDataTableInst } from '../context'
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
  showItemLabel: Boolean,
  position: {
    type: [String, Boolean] as PropType<'top' | 'bottom' | false>,
    default: 'bottom',
  },
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
  setup(props, { expose }) {
    const form = useInjectProFormInst()

    const [
      instRef,
      methods,
    ] = useProDataTableContext()

    const {
      columns,
    } = useColumns(props)

    const {
      getEditable,
      startEditable,
      cancelEditable,
      cancelEditableWithRestore,
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
        position,
        onUpdateValue,
        creatorButtonProps,
        creatorInitialValue,
        ...rest
      } = props

      return {
        ...rest,
        ref: instRef,
        data: props.value,
        rowKey: AUTO_CREATE_ID,
        columns: columns.value,
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
      cancelEditableWithRestore,
    }

    expose(exposed)
    provideProEditDataTableInst(exposed)
    provide(proFormListContextKey, {
      showLabel: toRef(props, 'showItemLabel'),
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
