import type { SlotsType } from 'vue'
import type { ProColorPickerSlots } from './slots'
import { ProField, ValueTypeEnum } from '../field'
import ProFieldColorPicker from './fields/field-color-picker'
import { proColorPickerProps } from './props'

export default defineComponent({
  name: 'ProColorPicker',
  props: proColorPickerProps,
  slots: Object as SlotsType<ProColorPickerSlots>,
  setup() {},
  render() {
    return (
      <ProField
        {...this.$props}
        defaultValue={null}
        valueType={ValueTypeEnum.COLOR_PICKER}
      >
        {{
          ...this.$slots,
          input: (pureProps: any) => {
            return <ProFieldColorPicker {...pureProps} v-slots={this.$slots} />
          },
        }}
      </ProField>
    )
  },
})
