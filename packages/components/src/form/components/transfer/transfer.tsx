import type { SlotsType } from 'vue'
import { ProField, ValueTypeEnum } from '../field'
import { proTransferProps } from './props'
import type { ProTransferSlots } from './slots'
import ProFieldTransfer from './fields/field-transfer'

export default defineComponent({
  name: 'ProTransfer',
  props: proTransferProps,
  slots: Object as SlotsType<ProTransferSlots>,
  setup() {},
  render() {
    return (
      <ProField
        {...this.$props}
        defaultValue={[]}
        valueType={ValueTypeEnum.TRANSFER}
      >
        {{
          ...this.$slots,
          input: (pureProps: any) => {
            return <ProFieldTransfer {...pureProps} v-slots={this.$slots} />
          },
        }}
      </ProField>
    )
  },
})
