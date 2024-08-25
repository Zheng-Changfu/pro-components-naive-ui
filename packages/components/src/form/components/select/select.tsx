import type { SlotsType } from 'vue'
import { ProField, ValueTypeEnum } from '../field'
import { proSelectProps } from './props'
import type { ProSelectSlots } from './slots'
import { useProSelectInst } from './inst'
import ProFieldSelect from './fields/field-select'

export default defineComponent({
  name: 'ProSelect',
  props: proSelectProps,
  slots: Object as SlotsType<ProSelectSlots>,
  setup(_, { expose }) {
    const [
      instRef,
      methods,
    ] = useProSelectInst()

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
        valueType={ValueTypeEnum.SELECT}
      >
        {{
          ...this.$slots,
          input: (pureProps: any) => {
            return <ProFieldSelect ref="instRef" {...pureProps} v-slots={this.$slots} />
          },
        }}
      </ProField>
    )
  },
})
