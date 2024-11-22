import type { SlotsType } from 'vue'
import type { ProSliderSlots } from './slots'
import { defineComponent } from 'vue'
import { useOverrideProps, usePostValue } from '../../../composables'
import { InternalValueTypeEnum, ProField } from '../field'
import Slider from './components/slider'
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

    const postValue = usePostValue(overridedProps, {
      undefToNull: true,
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
        valueType={InternalValueTypeEnum.SLIDER}
      >
        {{
          ...this.$slots,
          input: (pureProps: any) => {
            return (
              <Slider
                {...pureProps}
                v-slots={this.$slots}
              />
            )
          },
        }}
      </ProField>
    )
  },
})
