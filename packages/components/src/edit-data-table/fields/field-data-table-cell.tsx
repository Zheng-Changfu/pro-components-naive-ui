import type { PropType } from 'vue'
import type { ProEditDataTableColumn } from '../types'
import { defineComponent } from 'vue'
import { useInjectGlobalConfig } from '../../config-provider'
import { useProvidePath } from './composables/useProvidePath'

export default defineComponent({
  name: 'FieldDataTableCell',
  props: {
    row: {
      type: Object,
      required: true,
    },
    column: {
      type: Object as PropType<ProEditDataTableColumn>,
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

    const {
      path: rowPath,
    } = useProvidePath(toRef(props, 'rowIndex'))

    

  },

  render() {

  },
})
