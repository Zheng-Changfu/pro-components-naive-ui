import type { ArrayField } from 'pro-components-hooks'
import type { ExtractPublicPropTypes, SlotsType } from 'vue'
import type { ProButtonProps } from '../../button'
import type { ProDataTableProps } from '../../data-table'
import type { ProEditDataTableSlots } from '../slots'
import { omit } from 'lodash-es'
import { useInjectFieldContext } from 'pro-components-hooks'
import { ProDataTable } from '../../data-table'
import { proFieldProps, useInjectProFormInst } from '../../form'
import { AUTO_CREATE_ID } from '../../form-list'
import { proEditDataTableProps } from '../props'
import { useColumns } from './composables/useColumns'
import { useSummary } from './composables/useSummary'

const fieldDataTableProps = {
  ...omit(
    proEditDataTableProps,
    Object.keys(proFieldProps),
  ) as Omit<typeof proEditDataTableProps, keyof typeof proFieldProps>,
  max: Number,
  position: String as PropType<'top' | 'bottom'>,
  value: {
    type: Array as PropType<Array<Record<string, any>>>,
    required: true,
  },
  creatorButtonProps: {
    type: [Object, Boolean] as PropType<ProButtonProps | false>,
    default: undefined,
  },
} as const

export type FieldDataTableProps = ExtractPublicPropTypes<typeof fieldDataTableProps>

export default defineComponent({
  name: 'FieldDataTable',
  props: fieldDataTableProps,
  slots: Object as SlotsType<ProEditDataTableSlots>,
  setup(props, { expose }) {
    const form = useInjectProFormInst()

    const {
      columns,
    } = useColumns(props)

    const {
      summary,
      position,
    } = useSummary(props)

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
    } = useInjectFieldContext()! as ArrayField

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

    const exposed = {
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

    expose(exposed)

    const proDataTableProps = computed<ProDataTableProps>(() => {
      return {
        summary,
        data: props.value,
        rowKey: AUTO_CREATE_ID,
        columns: columns.value,
        summaryPlacement: position.value,
      }
    })

    return {
      proDataTableProps,
    }
  },
  render() {
    return <ProDataTable {...this.proDataTableProps} v-slots={this.$slots} />
  },
})
