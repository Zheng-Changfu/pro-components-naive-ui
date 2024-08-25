import { NSlider, sliderProps } from 'naive-ui'
import type { SlotsType } from 'vue'
import type { ProSliderSlots } from '../slots'
import { useReadonlyHelpers } from '../../field'

defineOptions({
  name: 'ProFieldSlider',
  inheritAttrs: false,
})
defineProps(sliderProps)
defineSlots<ProSliderSlots>()

export default defineComponent({
  name: 'ProFieldSlider',
  props: sliderProps,
  slots: Object as SlotsType<ProSliderSlots>,
  inheritAttrs: false,
  setup() {
    const {
      readonly,
      readonlyText,
    } = useReadonlyHelpers()

    return {
      readonly,
      readonlyText,
    }
  },
  render() {
    if (this.readonly) {
      const { readonlyText } = this

      if (this.$slots.readonly) {
        return this.$slots.readonly(this.$props)
      }
      return readonlyText
    }
    return (
      <NSlider
        {...this.$props}
        {...this.$attrs}
        v-slots={this.$slots}
      />
    )
  },
})
