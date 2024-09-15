import type { SlotsType } from 'vue'
import type { ProSwitchSlots } from './slots'
import { useOverrideProps } from '../../../composables'
import { ProField, ValueTypeEnum } from '../field'
import ProFieldSwitch from './fields/field-switch'
import { proSwitchProps } from './props'

const name = 'ProSwitch'
export default defineComponent({
  name,
  props: proSwitchProps,
  slots: Object as SlotsType<ProSwitchSlots>,
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
        defaultValue={false}
        valueType={ValueTypeEnum.SWITCH}
      >
        {{
          ...this.$slots,
          input: (pureProps: any) => [
            <ProFieldSwitch
              {...pureProps}
              v-slots={this.$slots}
            />,
          ],
        }}
      </ProField>
    )
  },
})
