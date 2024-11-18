import type { SlotsType } from 'vue'
import type { ProTransferSlots } from './slots'
import { useOverrideProps } from '../../../composables'
import { InternalValueTypeEnum, ProField } from '../field'
import Transfer from './fields/transfer'
import { proTransferProps } from './props'

const name = 'ProTransfer'
export default defineComponent({
  name,
  props: proTransferProps,
  slots: Object as SlotsType<ProTransferSlots>,
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
        defaultValue={[]}
        valueType={InternalValueTypeEnum.TRANSFER}
      >
        {{
          ...this.$slots,
          input: (pureProps: any) => {
            return (
              <Transfer
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
