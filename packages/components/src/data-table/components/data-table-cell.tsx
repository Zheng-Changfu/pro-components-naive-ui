import type { PropType } from 'vue'
import type { ProDataTableBaseColumn } from '../types'
import { get, isFunction } from 'lodash-es'
import { computed, defineComponent } from 'vue'
import { resolveComponentByValueType } from '../../_utils/resolveComponentByValueType'
import { pickInternalProFieldProps } from '../../form/components/type-utils'

export default defineComponent({
  name: 'DataTableCell',
  props: {
    row: {
      type: Object,
      required: true,
    },
    column: {
      type: Object as PropType<ProDataTableBaseColumn>,
      required: true,
    },
    rowIndex: {
      type: Number,
      required: true,
    },
    columnKey: String,
  } as const,
  setup(props) {
    const proFieldProps = computed(() => {
      const { row, column, rowIndex } = props
      const internalProFieldProps = pickInternalProFieldProps(column)
      const resolvedInternalProFieldProps = isFunction(column.proFieldProps) ? column.proFieldProps(row, rowIndex) : (column.proFieldProps ?? {})
      return {
        ...internalProFieldProps,
        ...resolvedInternalProFieldProps,
      }
    })

    const fieldProps = computed(() => {
      const { row, column, rowIndex } = props
      const { fieldProps } = column
      return isFunction(fieldProps) ? fieldProps(row, rowIndex) : (fieldProps ?? {})
    })

    return {
      fieldProps,
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

    if (column.render) {
      return column.render(row, rowIndex)
    }

    return resolveComponentByValueType(column.valueType ?? 'input', {
      fieldProps: this.fieldProps,
      fieldSlots: column.fieldSlots,
      proFieldProps: {
        simple: true,
        readonly: true,
        value: columnKey ? get(row, columnKey) : undefined,
        ...this.proFieldProps as any,
        path: `builtinPath.${rowIndex}.${columnKey}`,
      },
    })
  },
})
