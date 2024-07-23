<script lang="tsx">
import type { SlotsType } from 'vue'
import { computed, defineComponent } from 'vue'
import type { SliderProps } from 'naive-ui'
import { NSlider } from 'naive-ui'
import { resolveField, useField, useParseFieldProps } from '../../field'
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

    const parsedProps = useParseFieldProps(
      props,
      field,
      { placeholderIntoProps: false },
    )

    const nSliderProps = computed<SliderProps>(() => {
      const { value, doUpdateValue } = field
      return {
        ...parsedProps.value as any,
        'defaultValue': undefined,
        'onUpdate:value': undefined,
        'value': value.value,
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
              $props.fieldRender,
              {
                bindSlots: $slots,
                bindProps: this.nSliderProps,
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
