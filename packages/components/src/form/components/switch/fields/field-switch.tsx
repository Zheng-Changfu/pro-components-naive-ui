import { NSwitch, switchProps } from 'naive-ui'
import type { SlotsType } from 'vue'
import type { ProSwitchSlots } from '../slots'
import { useReadonlyHelpers } from '../../field'

export default defineComponent({
  name: 'ProFieldSwitch',
  props: switchProps,
  slots: Object as SlotsType<ProSwitchSlots>,
  inheritAttrs: false,
  setup() {
    const {
      value,
      readonly,
    } = useReadonlyHelpers()

    return {
      value,
      readonly,
    }
  },
  render() {
    if (this.readonly) {
      const { value } = this
      if (this.$slots.readonly) {
        return this.$slots.readonly(this.$props)
      }
      if (value) {
        return this.$slots.checked?.() ?? '打开'
      }
      return this.$slots.unchecked?.() ?? '关闭'
    }
    return (
      <NSwitch
        {...this.$props}
        {...this.$attrs}
        v-slots={this.$slots}
      />
    )
  },
})
