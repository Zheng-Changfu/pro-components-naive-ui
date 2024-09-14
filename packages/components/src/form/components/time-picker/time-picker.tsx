import type { SlotsType } from 'vue'
import type { ProTimePickerSlots } from './slots'
import { ProField, ValueTypeEnum } from '../field'
import ProFieldTimePicker from './fields/field-time-picker'
import { useProTimePickerInst } from './inst'
import { proTimePickerProps } from './props'

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
