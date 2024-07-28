<script lang='tsx'>
import type { SlotsType } from 'vue'
import { defineComponent } from 'vue'
import type { SwitchProps } from 'naive-ui'
import type { FieldRenderParameters } from '../field'
import { ProField, ValueTypeEnum } from '../field'
import { proSwitchProps } from './props'
import type { ProSwitchSlots } from './slots'
import FieldSwitch from './fields/field-switch.vue'

export default defineComponent({
  name: 'ProSwitch',
  props: proSwitchProps,
  slots: Object as SlotsType<ProSwitchSlots>,
  render() {
    const {
      $props,
      $slots,
    } = this

    return (
      <ProField
        {...$props}
        defaultValue={false}
        valueType={ValueTypeEnum.SWITCH}
        v-slots={{
          ...$slots,
          field: ({
            bindProps,
            bindSlots,
          }: FieldRenderParameters<SwitchProps, ProSwitchSlots>) => {
            return (
              <FieldSwitch
                {...bindProps}
                v-slots={bindSlots}
              />
            )
          },
        }}
      />
    )
  },
})
</script>
