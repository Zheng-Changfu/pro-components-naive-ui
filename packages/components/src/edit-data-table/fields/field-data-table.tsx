import type { ExtractPublicPropTypes, SlotsType } from 'vue'
import type { ProButtonProps } from '../../button'
import type { ProDataTableProps } from '../../data-table'
import type { ProEditDataTableInst } from '../inst'
import type { ProEditDataTableSlots } from '../slots'
import { omit } from 'lodash-es'
import { useInjectListFieldContext } from 'pro-components-hooks'
import { ProDataTable } from '../../data-table'
import { proFieldProps, useInjectProFormInst } from '../../form'
import { AUTO_CREATE_ID } from '../../form-list'
import { provideProEditDataTableInst } from '../context'
import { proEditDataTableProps } from '../props'
import { useColumns } from './composables/useColumns'
import { useEditable } from './composables/useEditable'
import { useProDataTableContext } from './composables/useProDataTableContext'
import { useSummary } from './composables/useSummary'

const fieldDataTableProps = {
  ...omit(
    proEditDataTableProps,
    Object.keys(proFieldProps),
  ) as Omit<typeof proEditDataTableProps, keyof typeof proFieldProps>,
  max: Number,
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
} as const

export type FieldDataTableProps = ExtractPublicPropTypes<typeof fieldDataTableProps>

export default defineComponent({
  name: 'FieldDataTable',
  props: fieldDataTableProps,
  slots: Object as SlotsType<ProEditDataTableSlots>,
  setup(props, { attrs, expose }) {
    const form = useInjectProFormInst()

    const [
      instRef,
      methods,
    ] = useProDataTableContext()

    const {
      columns,
    } = useColumns(props)

    const {
      summary,
      summaryPlacement,
    } = useSummary(props)

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
        position,
        onUpdateValue,
        creatorButtonProps,
        creatorInitialValue,
        ...rest
      } = props

      return {
        ...attrs,
        ...rest,
        summary,
        ref: instRef,
        data: props.value,
        rowKey: AUTO_CREATE_ID,
        columns: columns.value,
        summaryPlacement: summaryPlacement.value,
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
    return {
      proDataTableProps,
    }
  },
  render() {
    return <ProDataTable {...this.proDataTableProps} v-slots={this.$slots} />
  },
})
