import type { SlotsType } from 'vue'
import type { ProTransferSlots } from './slots'
import { ProField, ValueTypeEnum } from '../field'
import ProFieldTransfer from './fields/field-transfer'
import { proTransferProps } from './props'

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
