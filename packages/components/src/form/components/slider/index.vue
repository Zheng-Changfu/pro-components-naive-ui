<script lang='tsx'>
import type { SlotsType } from 'vue'
import { defineComponent } from 'vue'
import type { SliderProps } from 'naive-ui'
import type { FieldRenderParameters } from '../field'
import { ProField, ValueTypeEnum } from '../field'
import { proSliderProps } from './props'
import type { ProSliderSlots } from './slots'
import FieldSlider from './fields/field-slider.vue'

export default defineComponent({
  name: 'ProSlider',
  props: proSliderProps,
  slots: Object as SlotsType<ProSliderSlots>,
  render() {
    const {
      $props,
      $slots,
    } = this

    return (
      <ProField
        {...$props}
        defaultValue={null}
        valueType={ValueTypeEnum.SLIDER}
        v-slots={{
          ...$slots,
          field: ({
            bindProps,
            bindSlots,
          }: FieldRenderParameters<SliderProps, ProSliderSlots>) => {
            return (
              <FieldSlider
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
