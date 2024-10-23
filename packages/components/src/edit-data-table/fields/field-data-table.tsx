import type { ExtractPublicPropTypes, SlotsType } from 'vue'
import type { ProButtonProps } from '../../button'
import type { ProDataTableProps } from '../../data-table'
import type { ProEditDataTableSlots } from '../slots'
import { omit } from 'lodash-es'
import { ProDataTable } from '../../data-table'
import { proFieldProps } from '../../form'
import { AUTO_CREATE_ID } from '../../form-list'
import { proEditDataTableProps } from '../props'
import { useColumns } from './composables/useColumns'
import { useDataSource } from './composables/useDataSource'
import { useSummary } from './composables/useSummary'

const fieldDataTableProps = {
  ...omit(
    proEditDataTableProps,
    Object.keys(proFieldProps),
  ) as Omit<typeof proEditDataTableProps, keyof typeof proFieldProps>,
  max: Number,
  position: String as PropType<'top' | 'bottom'>,
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
  setup(props) {
    const {
      columns,
    } = useColumns(props)

    const {
      data,
    } = useDataSource(props)

    const {
      summary,
      position,
    } = useSummary(props)

    const proDataTableProps = computed<ProDataTableProps>(() => {
      return {
        summary,
        data: data.value,
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
