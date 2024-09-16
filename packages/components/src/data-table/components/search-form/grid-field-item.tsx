import type { PropType } from 'vue'
import type { ProSearchFormColumn } from './types'
import { NGi } from 'naive-ui'
import { compile } from 'pro-components-hooks'
import { defineComponent } from 'vue'
import { useInjectGlobalConfig } from '../../../config-provider'
import { useInjectProFormInst } from '../../../form'

export default defineComponent({
  name: 'GridFieldItem',
  /**
   * support n-grid
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

    const {
      getScope,
      getFieldValue,
    } = useInjectProFormInst()!

    const columnScope = computed(() => {
      const selfValue = getFieldValue(props.column.path ?? '')
      const builtinScope = {
        $row: {},
        $total: 0,
        $index: -1,
        $record: {},
        $rowIndex: -1,
        $self: selfValue,
      }
      return {
        ...getScope(),
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

    return {
      valueTypeMap,
      columnVisible,
    }
  },
  render() {
    const { column } = this.$props

    if (!this.columnVisible) {
      return null
    }

    const {
      slots,
      render,
      span,
      offset,
      valueType = 'input',
      ...fieldProps
    } = column

    const Field = this.valueTypeMap[valueType]

    return (
      <NGi
        span={span}
        offset={offset}
      >
        {{
          default: () => [
            render
              ? render()
              : Field && h(Field, fieldProps, slots),
          ],
        }}
      </NGi>
    )
  },
})
