import type { SlotsType } from 'vue'
import { ProField, ValueTypeEnum } from '../field'
import { proTimePickerProps } from './props'
import type { ProTimePickerSlots } from './slots'
import { useProTimePickerInst } from './inst'
import ProFieldTimePicker from './fields/field-time-picker'

export default defineComponent({
  name: 'ProTime',
  props: proTimePickerProps,
  slots: Object as SlotsType<ProTimePickerSlots>,
  setup(_, { expose }) {
    const [
      instRef,
      methods,
    ] = useProTimePickerInst()

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
        valueType={ValueTypeEnum.TIME}
      >
        {{
          ...this.$slots,
          input: (pureProps: any) => {
            return <ProFieldTimePicker ref="instRef" {...pureProps} v-slots={this.$slots} />
          },
        }}
      </ProField>
    )
  },
})
