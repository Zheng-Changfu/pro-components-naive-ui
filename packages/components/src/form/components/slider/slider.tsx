import type { SlotsType } from 'vue'
import type { ProSliderSlots } from './slots'
import { ProField, ValueTypeEnum } from '../field'
import ProFieldSlider from './fields/field-slider'
import { proSliderProps } from './props'

export default defineComponent({
  name: 'ProSlider',
  props: proSliderProps,
  slots: Object as SlotsType<ProSliderSlots>,
  setup() {},
  render() {
    return (
      <ProField
        {...this.$props}
        defaultValue={null}
        valueType={ValueTypeEnum.SLIDER}
      >
        {{
          ...this.$slots,
          input: (pureProps: any) => {
            return <ProFieldSlider {...pureProps} v-slots={this.$slots} />
          },
        }}
      </ProField>
    )
  },
})
