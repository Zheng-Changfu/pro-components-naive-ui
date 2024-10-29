import type { PropType } from 'vue'
import type { ProEditDataTableBaseColumn } from '../types'
import { isFunction } from 'lodash-es'
import { compile, useInjectFieldContext } from 'pro-components-hooks'
import { computed, defineComponent } from 'vue'
import { useInjectGlobalConfig } from '../../config-provider'
import { useInjectProEditDataTableInst } from '../context'
import { useProvidePath } from './composables/useProvidePath'

export default defineComponent({
  name: 'FieldDataTableCell',
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
    columnKey: String,
  } as const,
  setup(props) {
    useProvidePath(toRef(
      props,
      'rowIndex',
    ))

    const {
      valueTypeMap,
    } = useInjectGlobalConfig()

    const {
      getEditable,
    } = useInjectProEditDataTableInst()!

    const {
      scope,
    } = useInjectFieldContext()!

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

    const readonly = computed(() => {
      const { rowIndex } = props
      const rowEditable = getEditable(rowIndex)
      const editable = rowEditable && compile(proFieldProps.value.readonly, scope) !== true
      return !editable
    })

    return {
      readonly,
      fieldProps,
      valueTypeMap,
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

    const Component = this.valueTypeMap[column.valueType!]
    return Component
      ? h(Component, {
        ...this.proFieldProps,
        readonly: this.readonly,
        fieldProps: this.fieldProps,
        path: columnKey,
      }, column.fieldSlots)
      : null
  },
})
