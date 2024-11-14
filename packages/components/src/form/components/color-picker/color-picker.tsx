import type { SlotsType } from 'vue'
import type { ProColorPickerSlots } from './slots'
import { useOverrideProps } from '../../../composables'
import { ProField, InternalValueTypeEnum } from '../field'
import ColorPicker from './fields/color-picker'
import { proColorPickerProps } from './props'

const name = 'ProColorPicker'
export default defineComponent({
  name,
  props: proColorPickerProps,
  slots: Object as SlotsType<ProColorPickerSlots>,
  setup(props) {
    const overridedProps = useOverrideProps(
      name,
      props,
    )

    return {
      overridedProps,
    }
  },
  render() {
    return (
      <ProField
        {...this.overridedProps}
        defaultValue={null}
        valueType={InternalValueTypeEnum.COLOR_PICKER}
      >
        {{
          ...this.$slots,
          input: (pureProps: any) => (
            <ColorPicker
              {...pureProps}
              v-slots={this.$slots}
            />
          ),
        }}
      </ProField>
    )
  },
})
