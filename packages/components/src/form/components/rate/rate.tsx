import type { SlotsType } from 'vue'
import type { ProRateSlots } from './slots'
import { ProField, ValueTypeEnum } from '../field'
import ProFieldRate from './fields/field-rate'
import { proRateProps } from './props'

export default defineComponent({
  name: 'ProRate',
  props: proRateProps,
  slots: Object as SlotsType<ProRateSlots>,
  setup() {},
  render() {
    return (
      <ProField
        {...this.$props}
        defaultValue={null}
        valueType={ValueTypeEnum.RATE}
      >
        {{
          ...this.$slots,
          input: (pureProps: any) => {
            return <ProFieldRate {...pureProps} v-slots={this.$slots} />
          },
        }}
      </ProField>
    )
  },
})
