import type { SlotsType } from 'vue'
import type { ProRadioGroupSlots } from './slots'
import { useOverrideProps } from '../../../composables'
import { ProField, ValueTypeEnum } from '../field'
import RadioGroup from './fields/radio-group'
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

    return {
      overridedProps,
    }
  },
  render() {
    return (
      <ProField
        {...this.overridedProps}
        defaultValue={null}
        valueType={ValueTypeEnum.RADIO_GROUP}
      >
        {{
          ...this.$slots,
          input: (pureProps: any) => [
            <RadioGroup
              {...pureProps}
              v-slots={this.$slots}
            />,
          ],
        }}
      </ProField>
    )
  },
})
