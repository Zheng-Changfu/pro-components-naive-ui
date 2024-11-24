import type { SlotsType } from 'vue'
import type { ProRadioGroupSlots } from './slots'
import { defineComponent } from 'vue'
import { useOverrideProps, usePostValue } from '../../../composables'
import { InternalValueTypeEnum, ProField } from '../field'
import RadioGroup from './components/radio-group'
import { proRadioGroupProps } from './props'

const name = 'ProRadioGroup'
export default defineComponent({
  name,
  props: proRadioGroupProps,
  slots: Object as SlotsType<ProRadioGroupSlots>,
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
        valueType={InternalValueTypeEnum.RADIO_GROUP}
      >
        {{
          ...this.$slots,
          input: (pureProps: any) => {
            return (
              <RadioGroup
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
