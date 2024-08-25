import type { SlotsType } from 'vue'
import { ProField, ValueTypeEnum } from '../field'
import { proTreeSelectProps } from './props'
import type { ProTreeSelectSlots } from './slots'
import { useProTreeSelectInst } from './inst'
import ProFieldTreeSelect from './fields/field-tree-select'

export default defineComponent({
  name: 'ProTreeSelect',
  props: proTreeSelectProps,
  slots: Object as SlotsType<ProTreeSelectSlots>,
  setup(_, { expose }) {
    const [
      instRef,
      methods,
    ] = useProTreeSelectInst()

    expose(methods)
    return {
      instRef,
    }
  },
  render() {
    return (
      <ProField
        {...this.$props}
        defaultValue={null}
        valueType={ValueTypeEnum.TREE_SELECT}
      >
        {{
          ...this.$slots,
          input: (pureProps: any) => {
            return <ProFieldTreeSelect ref="instRef" {...pureProps} v-slots={this.$slots} />
          },
        }}
      </ProField>
    )
  },
})
