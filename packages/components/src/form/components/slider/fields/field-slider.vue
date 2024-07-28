<script lang='tsx'>
import { NSlider, sliderProps } from 'naive-ui'
import type { SlotsType } from 'vue'
import { defineComponent } from 'vue'
import type { ProSliderSlots } from '../slots'
import { useReadonlyHelpers } from '../../field'

export default defineComponent({
  name: 'FieldSlider',
  props: sliderProps,
  slots: Object as SlotsType<ProSliderSlots>,
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
    const {
      $props,
      $slots,
      readonly,
      readonlyText,
    } = this

    if (readonly) {
      return readonlyText
    }

    return (
      <NSlider
        {...$props}
        v-slots={$slots}
      />
    )
  },
})
</script>
