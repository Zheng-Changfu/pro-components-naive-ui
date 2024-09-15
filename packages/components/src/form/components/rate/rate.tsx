import type { SlotsType } from 'vue'
import type { ProRateSlots } from './slots'
import { useOverrideProps } from '../../../composables'
import { ProField, ValueTypeEnum } from '../field'
import ProFieldRate from './fields/field-rate'
import { proRateProps } from './props'

const name = 'ProRate'
export default defineComponent({
  name,
  props: proRateProps,
  slots: Object as SlotsType<ProRateSlots>,
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
        valueType={ValueTypeEnum.RATE}
      >
        {{
          ...this.$slots,
          input: (pureProps: any) => [
            <ProFieldRate
              {...pureProps}
              v-slots={this.$slots}
            />,
          ],
        }}
      </ProField>
    )
  },
})
