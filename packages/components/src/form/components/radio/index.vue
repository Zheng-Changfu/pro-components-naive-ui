<script lang="tsx">
import type { SlotsType } from 'vue'
import { computed, defineComponent } from 'vue'
import type { RadioProps } from 'naive-ui'
import { NRadio } from 'naive-ui'
import { resolveField, useField, useParseFieldProps } from '../../field'
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

    const parsedProps = useParseFieldProps(
      props,
      field,
      { placeholderIntoProps: false },
    )

    const nRadioProps = computed<RadioProps>(() => {
      const { value, doUpdateValue } = field
      return {
        ...parsedProps.value,
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
              $props.fieldRender,
              {
                bindSlots: $slots,
                bindProps: this.nRadioProps,
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
