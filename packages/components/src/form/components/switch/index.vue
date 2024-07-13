<script lang="tsx">
import type { SlotsType } from 'vue'
import { computed, defineComponent } from 'vue'
import type { SwitchProps } from 'naive-ui'
import { NSwitch } from 'naive-ui'
import { resolveField, useField, useFieldBindValues } from '../../field'
import { ProFormItem } from '../../form-item'
import { proSwitchProps } from './props'
import type { ProSwitchSlots } from './slots'

export default defineComponent({
  name: 'ProSwitch',
  props: proSwitchProps,
  slots: Object as SlotsType<ProSwitchSlots>,
  setup(props) {
    const field = useField(
      'ProSwitch',
      props,
      { defaultValue: false },
    )

    const {
      bindValues,
    } = useFieldBindValues(field, props)

    const nSwitchProps = computed<SwitchProps>(() => {
      const { value, doUpdateValue } = field
      return {
        ...bindValues.value as any,
        'defaultValue': undefined,
        'onUpdate:value': undefined,

        'value': value.value,
        'onUpdateValue': doUpdateValue,
      }
    })

    return {
      nSwitchProps,
    }
  },
  render() {
    const {
      $props,
      $slots,
    } = this

    return (
      <ProFormItem
        {...$props}
        v-slots={{
          default: () => {
            return resolveField(
              $props.fieldRender,
              {
                bindSlots: $slots,
                bindValues: this.nSwitchProps,
              },
              () => (
                <NSwitch
                  {...this.nSwitchProps}
                  v-slots={$slots}
                />
              ),
            )
          },
        }}
      >
      </ProFormItem>
    )
  },
})
</script>
