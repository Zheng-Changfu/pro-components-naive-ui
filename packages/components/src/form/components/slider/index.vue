<script lang="tsx">
import type { SlotsType } from 'vue'
import { computed, defineComponent } from 'vue'
import type { SliderProps } from 'naive-ui'
import { NSlider } from 'naive-ui'
import { resolveField, useField, useFieldBindValues } from '../../field'
import { ProFormItem } from '../../form-item'
import { proSliderProps } from './props'
import type { ProSliderSlots } from './slots'

export default defineComponent({
  name: 'ProSlider',
  props: proSliderProps,
  slots: Object as SlotsType<ProSliderSlots>,
  setup(props) {
    const field = useField(
      'ProSlider',
      props,
      { defaultValue: null },
    )

    const bindValues = useFieldBindValues(
      field,
      props,
    )

    const nSliderProps = computed<SliderProps>(() => {
      const { value, doUpdateValue } = field
      const { placeholder, ...rest } = bindValues.value
      return {
        ...rest as any,
        'value': value.value,
        'defaultValue': undefined,
        'onUpdate:value': undefined,
        'onUpdateValue': doUpdateValue,
      }
    })

    return {
      nSliderProps,
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
                bindValues: this.nSliderProps,
              },
              () => (
                <NSlider
                  {...this.nSliderProps}
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
