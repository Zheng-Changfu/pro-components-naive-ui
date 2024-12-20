import type { PropType } from 'vue'
import type { ProEditDataTableBaseColumn } from '../types'
import { isFunction } from 'lodash-es'
import { computed, defineComponent, inject, toRef } from 'vue'
import { resolveComponentByValueType } from '../../_utils/resolveComponentByValueType'
import { editDataTableInjectionKey, useInjectProEditDataTableInst } from '../context'
import { useProvidePath } from './composables/useProvidePath'

export default defineComponent({
  name: 'EditDataTableCell',
  props: {
    row: {
      type: Object,
      required: true,
    },
    rowKey: {
      type: [String, Number],
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
    const { editableKeys } = inject(editDataTableInjectionKey)!

    const proFieldProps = computed(() => {
      const { row, column, rowIndex } = props
      const { proFieldProps } = column
      return isFunction(proFieldProps) ? proFieldProps(row, rowIndex) : (proFieldProps ?? {})
    })

    // 这里类型复杂会导致构建类型声明文件失败，先用 Record<string, any> 解决
    const fieldProps = computed<Record<string, any>>(() => {
      const { row, column, rowIndex } = props
      const { fieldProps } = column
      return isFunction(fieldProps) ? fieldProps(row, rowIndex) : (fieldProps ?? {})
    })

    const rowEditable = computed(() => {
      return editableKeys.value.has(props.rowKey)
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
            ...this.proFieldProps,
            path: columnKey,
            readonly: !this.cellEditable,
          },
        })
  },
})
