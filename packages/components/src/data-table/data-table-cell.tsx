import type { PropType } from 'vue'
import type { ProDataTableBaseColumn } from './types'
import { get, isFunction } from 'lodash-es'
import { computed, defineComponent } from 'vue'
import { useInjectGlobalConfig } from '../config-provider'
import { useInjectProDataTableInst } from './context'

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
    const {
      valueTypeMap,
    } = useInjectGlobalConfig()

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

    return {
      fieldProps,
      valueTypeMap,
      proFieldProps,
      action: useInjectProDataTableInst()!,
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
      return column.render(row, rowIndex, this.action)
    }

    const Component = this.valueTypeMap[column.valueType ?? 'input']
    return Component
      ? h(Component, {
        simple: true,
        readonly: true,
        path: `builtinPath.${rowIndex}.${columnKey}`,
        value: columnKey ? get(row, columnKey) : undefined,
        ...this.proFieldProps,
        fieldProps: this.fieldProps,
      }, column.fieldSlots)
      : null
  },
})
