import type { SlotsType } from 'vue'
import type { ProColorPickerProps } from './props'
import type { ProColorPickerSlots } from './slots'
import { defineComponent } from 'vue'
import { useOverrideProps, usePostValue } from '../../../composables'
import { ProField } from '../field'
import { InternalValueTypeEnum } from '../field/enums'
import ColorPicker from './components/color-picker'
import { proColorPickerProps } from './props'

const name = 'ProColorPicker'
export default defineComponent({
  name,
  props: proColorPickerProps,
  slots: Object as SlotsType<ProColorPickerSlots>,
  setup(props) {
    const overridedProps = useOverrideProps<ProColorPickerProps>(
      name,
      props,
    )

    const postValue = usePostValue(overridedProps, {
      nilToNull: true,
    })

    return {
      postValue,
      overridedProps,
    }
  },
  render() {
    return (
      <ProField
        {...this.overridedProps}
        postValue={this.postValue}
        valueType={InternalValueTypeEnum.COLOR_PICKER}
      >
        {{
          ...this.$slots,
          input: (pureProps: any) => {
            return <ColorPicker {...pureProps} v-slots={this.$slots}></ColorPicker>
          },
        }}
      </ProField>
    )
  },
})
