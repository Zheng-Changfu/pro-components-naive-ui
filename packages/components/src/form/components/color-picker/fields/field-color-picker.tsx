import type { SlotsType } from 'vue'
import type { ProColorPickerSlots } from '../slots'
import { omit } from 'lodash-es'
import { colorPickerProps, NColorPicker } from 'naive-ui'
import { useReadonlyHelpers } from '../../field'

export default defineComponent({
  name: 'ProFieldColorPicker',
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
      ...omit(this.$slots, 'title'),
      label: this.$slots.title,
    }

    if (this.readonly) {
      const { empty, emptyText } = this

      if (this.$slots.readonly) {
        return this.$slots.readonly(this.$props)
      }
      if (empty) {
        return emptyText
      }
      return (
        <NColorPicker
          {...this.$props}
          {...this.$attrs}
          disabled
          v-slots={slots}
        />
      )
    }
    return (
      <NColorPicker
        {...this.$props}
        {...this.$attrs}
        v-slots={slots}
      />
    )
  },
})
