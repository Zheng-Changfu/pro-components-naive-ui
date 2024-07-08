<script lang="tsx">
import type { SlotsType } from 'vue'
import { computed, defineComponent } from 'vue'
import type { RadioProps } from 'naive-ui'
import { NRadio } from 'naive-ui'
import { resolveField, useField, useFieldBindValues } from '../../field'
import { ProFormItem } from '../../form-item'
import { proRadioProps } from './props'
import type { ProRadioSlots } from './slots'

export default defineComponent({
  name: 'ProRadio',
  props: proRadioProps,
  slots: Object as SlotsType<ProRadioSlots>,
  setup(props) {
    const field = useField(
      'ProRadio',
      props,
      { defaultValue: null },
    )

    const bindValues = useFieldBindValues(
      field,
      props,
    )

    const nRadioProps = computed<RadioProps>(() => {
      const { value, doUpdateValue } = field
      const { placeholder, ...rest } = bindValues.value
      return {
        ...rest,
        'defaultChecked': undefined,
        'onUpdate:checked': undefined,

        'checked': value.value,
        'onUpdateChecked': doUpdateValue,
      }
    })

    return {
      nRadioProps,
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
              $props.renderField,
              {
                bindSlots: $slots,
                bindValues: this.nRadioProps,
              },
              () => (
                <NRadio
                  {...this.nRadioProps}
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
