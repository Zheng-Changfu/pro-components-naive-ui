import type { SlotsType } from 'vue'
import type { ProSwitchSlots } from './slots'
import { ProField, ValueTypeEnum } from '../field'
import ProFieldSwitch from './fields/field-switch'
import { proSwitchProps } from './props'

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
