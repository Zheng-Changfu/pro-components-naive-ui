import type { GridItemProps } from 'naive-ui'
import type { PropType } from 'vue'
import type { ProSearchFormColumn } from '../types'
import { isFunction } from 'lodash-es'
import { NGi } from 'naive-ui'
import { computed, defineComponent } from 'vue'
import { resolveComponentByValueType } from '../../_utils/resolveComponentByValueType'
import { pickProFieldSharedProps } from '../../form'

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
    const proFieldProps = computed(() => {
      const { column } = props
      const proFieldSharedProps = pickProFieldSharedProps(column)
      const resolvedInternalProFieldProps = isFunction(column.proFieldProps) ? column.proFieldProps() : (column.proFieldProps ?? {})
      return {
        ...proFieldSharedProps,
        ...resolvedInternalProFieldProps,
      }
    })

    const fieldProps = computed(() => {
      const { fieldProps } = props.column
      return isFunction(fieldProps) ? fieldProps() : (fieldProps ?? {})
    })

    const nGiProps = computed<GridItemProps>(() => {
      const { span, offset } = props.column
      return {
        span,
        offset,
      }
    })

    const columnVisible = computed(() => {
      /**
       * 确保表单被隐藏后 NGi 也被隐藏
       */
      const {
        hidden,
        visible,
      } = proFieldProps.value

      if (visible === undefined && hidden === undefined) {
        return true
      }
      return visible !== undefined
        ? visible
        : !hidden
    })

    return {
      nGiProps,
      fieldProps,
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
            return column.render
              ? column.render()
              : resolveComponentByValueType(column.valueType ?? 'input', {
                fieldProps: this.fieldProps,
                fieldSlots: column.fieldSlots,
                proFieldProps: {
                  ...this.proFieldProps,
                  path: column.path,
                },
              })
          },
        }}
      </NGi>
    )
  },
})
