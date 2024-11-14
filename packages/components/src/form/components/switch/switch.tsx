import type { SlotsType } from 'vue'
import type { ProSwitchSlots } from './slots'
import { useOverrideProps } from '../../../composables'
import { ProField, InternalValueTypeEnum } from '../field'
import Switch from './fields/switch'
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
        valueType={InternalValueTypeEnum.SWITCH}
      >
        {{
          ...this.$slots,
          input: (pureProps: any) => (
            <Switch
              {...pureProps}
              v-slots={this.$slots}
            />
          ),
        }}
      </ProField>
    )
  },
})
