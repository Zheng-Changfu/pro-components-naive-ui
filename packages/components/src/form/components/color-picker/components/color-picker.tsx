import type { SlotsType, VNodeChild } from 'vue'
import type { ProColorPickerSlots } from '../slots'
import { colorPickerProps, NColorPicker } from 'naive-ui'
import { defineComponent } from 'vue'
import { useReadonlyHelpers } from '../../field'

export default defineComponent({
  name: 'ColorPicker',
  inheritAttrs: false,
  props: colorPickerProps,
  slots: Object as SlotsType<ProColorPickerSlots>,
  setup() {
    const {
      empty,
      readonly,
      emptyText,
    } = useReadonlyHelpers()

    return {
      empty,
      readonly,
      emptyText,
    }
  },
  render() {
    const slots = {
      ...this.$slots,
      label: this.$slots['naive-label'],
    }

    const disabled = this.readonly
      ? true
      : this.$props.disabled

    const dom = this.readonly && this.empty
      ? this.emptyText
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
