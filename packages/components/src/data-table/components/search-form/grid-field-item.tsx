import type { GridItemProps } from 'naive-ui'
import type { PropType } from 'vue'
import type { ProSearchFormColumn } from './types'
import { isFunction } from 'lodash-es'
import { NGi } from 'naive-ui'
import { compile } from 'pro-composables'
import { defineComponent } from 'vue'
import { useInjectGlobalConfig } from '../../../config-provider'
import { useInjectProFormInst } from '../../../form'
import { pickInternalProFieldProps } from '../../../form/components/type-utils'

export default defineComponent({
  name: 'GridFieldItem',
  /**
   * 支持 n-grid
   */
  __GRID_ITEM__: true,
  props: {
    column: {
      type: Object as PropType<ProSearchFormColumn>,
      required: true,
    },
  },
  setup(props) {
    const {
      valueTypeMap,
    } = useInjectGlobalConfig()

    const action = useInjectProFormInst()!

    const columnScope = computed(() => {
      const selfValue = action.getFieldValue(props.column.path ?? '')
      const builtinScope = {
        $row: {},
        $total: 0,
        $index: -1,
        $record: {},
        $rowIndex: -1,
        $self: selfValue,
      }
      return {
        ...action.getScope(),
        ...builtinScope,
      }
    })

    const columnVisible = computed(() => {
      const {
        hidden,
        visible,
      } = props.column

      if (visible === undefined && hidden === undefined) {
        return true
      }

      /**
       * 确保表单被隐藏后 NGi 也被隐藏
       */
      return visible !== undefined
        ? compile(visible, columnScope.value)
        : !compile(hidden, columnScope.value)
    })

    const proFieldProps = computed(() => {
      const { column } = props
      const internalProFieldProps = pickInternalProFieldProps(column)
      const resolvedInternalProFieldProps = isFunction(column.proFieldProps) ? column.proFieldProps(action) : (column.proFieldProps ?? {})
      return {
        ...internalProFieldProps,
        ...resolvedInternalProFieldProps,
      }
    })

    const fieldProps = computed(() => {
      const { fieldProps } = props.column
      return isFunction(fieldProps) ? fieldProps(action) : (fieldProps ?? {})
    })

    const nGiProps = computed<GridItemProps>(() => {
      const { span, offset } = props.column
      return {
        span,
        offset,
      }
    })

    return {
      action,
      nGiProps,
      fieldProps,
      valueTypeMap,
      columnVisible,
      proFieldProps,
    }
  },
  render() {
    if (!this.columnVisible) {
      return null
    }

    const {
      column,
    } = this.$props

    return (
      <NGi {...this.nGiProps}>
        {{
          default: () => {
            if (column.render) {
              return column.render(this.action)
            }
            const Component = this.valueTypeMap[column.valueType ?? 'input']
            return Component
              ? h(Component, {
                ...this.proFieldProps,
                path: column.path,
                fieldProps: this.fieldProps,
              }, column.fieldSlots)
              : null
          },
        }}
      </NGi>
    )
  },
})
