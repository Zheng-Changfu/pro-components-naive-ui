import type { SlotsType } from 'vue'
import type { ProColorPickerSlots } from '../slots'
import { colorPickerProps, NColorPicker } from 'naive-ui'
import { defineComponent } from 'vue'
import { useFieldUtils } from '../../field'

export default defineComponent({
  name: 'ColorPicker',
  inheritAttrs: false,
  props: colorPickerProps,
  slots: Object as SlotsType<ProColorPickerSlots>,
  setup() {
    const {
      empty,
      readonly,
      emptyDom,
    } = useFieldUtils()

    return {
      empty,
      readonly,
      emptyDom,
    }
  },
  render() {
    const slots = {
      ...this.$slots,
      label: this.$slots['input-label'],
    }

    const disabled = this.readonly
      ? true
      : this.$props.disabled

    const dom = this.readonly && this.empty
      ? this.emptyDom
      : (
          <NColorPicker
            {...this.$props}
            {...this.$attrs}
            disabled={disabled}
            v-slots={slots}
          />
        )

    return this.$slots.input
      ? this.$slots.input({
        inputDom: dom,
        readonly: this.readonly,
        inputProps: this.$props,
      })
      : dom
  },
})
