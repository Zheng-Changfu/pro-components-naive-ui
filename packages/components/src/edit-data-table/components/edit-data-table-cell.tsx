import type { PropType } from 'vue'
import type { ProEditDataTableBaseColumn } from '../types'
import { isFunction } from 'lodash-es'
import { computed, defineComponent, toRef } from 'vue'
import { resolveComponentByValueType } from '../../_utils/resolveComponentByValueType'
import { useInjectProEditDataTableInst } from '../context'
import { useProvidePath } from './composables/useProvidePath'

export default defineComponent({
  name: 'EditDataTableCell',
  props: {
    row: {
      type: Object,
      required: true,
    },
    column: {
      type: Object as PropType<ProEditDataTableBaseColumn>,
      required: true,
    },
    rowIndex: {
      type: Number,
      required: true,
    },
    columnKey: [String, Number],
  } as const,
  setup(props) {
    useProvidePath(toRef(
      props,
      'rowIndex',
    ))

    const action = useInjectProEditDataTableInst()!

    const proFieldProps = computed(() => {
      const { row, column, rowIndex } = props
      const { proFieldProps } = column
      return isFunction(proFieldProps) ? proFieldProps(row, rowIndex) : (proFieldProps ?? {})
    })

    const fieldProps = computed(() => {
      const { row, column, rowIndex } = props
      const { fieldProps } = column
      return isFunction(fieldProps) ? fieldProps(row, rowIndex) : (fieldProps ?? {})
    })

    const rowEditable = computed(() => {
      return action.getEditable(props.rowIndex)
    })

    const cellEditable = computed(() => {
      return rowEditable.value && proFieldProps.value.readonly !== true
    })

    return {
      action,
      fieldProps,
      rowEditable,
      cellEditable,
      proFieldProps,
    }
  },

  render() {
    const {
      row,
      column,
      rowIndex,
      columnKey,
    } = this.$props

    return column.render
      ? column.render(row, rowIndex, {
        ...this.action,
        editable: this.rowEditable,
      })
      : resolveComponentByValueType(column.valueType ?? 'input', {
        fieldProps: this.fieldProps,
        fieldSlots: column.fieldSlots,
        proFieldProps: {
          validateBehavior: 'popover',
          ...this.proFieldProps,
          path: columnKey,
          readonly: !this.cellEditable,
        },
      })
  },
})
