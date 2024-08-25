import type { SlotsType } from 'vue'
import { ProField, ValueTypeEnum } from '../field'
import { proSwitchProps } from './props'
import type { ProSwitchSlots } from './slots'
import ProFieldSwitch from './fields/field-switch'

export default defineComponent({
  name: 'ProSwitch',
  props: proSwitchProps,
  slots: Object as SlotsType<ProSwitchSlots>,
  setup() {},
  render() {
    return (
      <ProField
        {...this.$props}
        defaultValue={false}
        valueType={ValueTypeEnum.SWITCH}
      >
        {{
          ...this.$slots,
          input: (pureProps: any) => {
            return <ProFieldSwitch {...pureProps} v-slots={this.$slots} />
          },
        }}
      </ProField>
    )
  },
})
