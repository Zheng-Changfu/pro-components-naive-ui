import type { SlotsType } from 'vue'
import type { ProTransferSlots } from './slots'
import { useOverrideProps } from '../../../composables'
import { ProField, ValueTypeEnum } from '../field'
import ProFieldTransfer from './fields/field-transfer'
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
        valueType={ValueTypeEnum.TRANSFER}
      >
        {{
          ...this.$slots,
          input: (pureProps: any) => [
            <ProFieldTransfer
              {...pureProps}
              v-slots={this.$slots}
            />,
          ],
        }}
      </ProField>
    )
  },
})
