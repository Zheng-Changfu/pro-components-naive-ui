import type { SlotsType } from 'vue'
import type { ProSliderSlots } from '../slots'
import { NSlider, sliderProps } from 'naive-ui'
import { defineComponent } from 'vue'
import { useFieldUtils } from '../../field'

export default defineComponent({
  name: 'Slider',
  props: sliderProps,
  slots: Object as SlotsType<ProSliderSlots>,
  inheritAttrs: false,
  setup() {
    const {
      readonly,
      readonlyText,
      validationStatus,
    } = useFieldUtils()

    return {
      readonly,
      readonlyText,
      validationStatus,
    }
  },
  render() {
    const dom = this.readonly
      ? this.readonlyText
      : (
          <NSlider
            {...this.$props}
            {...this.$attrs}
            v-slots={this.$slots}
          />
        )

    return this.$slots.input
      ? this.$slots.input({
        inputDom: dom,
        readonly: this.readonly,
        inputProps: this.$props,
        ...this.validationStatus,
      })
      : dom
  },
})
