import type { SlotsType } from 'vue'
import type { ProSliderSlots } from './slots'
import { useOverrideProps } from '../../../composables'
import { ProField, ValueTypeEnum } from '../field'
import ProFieldSlider from './fields/field-slider'
import { proSliderProps } from './props'

const name = 'ProSlider'
export default defineComponent({
  name,
  props: proSliderProps,
  slots: Object as SlotsType<ProSliderSlots>,
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
        valueType={ValueTypeEnum.SLIDER}
      >
        {{
          ...this.$slots,
          input: (pureProps: any) => [
            <ProFieldSlider
              {...pureProps}
              v-slots={this.$slots}
            />,
          ],
        }}
      </ProField>
    )
  },
})
