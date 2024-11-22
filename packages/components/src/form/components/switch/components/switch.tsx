import type { SlotsType } from 'vue'
import type { ProSwitchSlots } from '../slots'
import { NSwitch, switchProps } from 'naive-ui'
import { defineComponent } from 'vue'
import { useLocale } from '../../../../locales'
import { useReadonlyHelpers } from '../../field'

export default defineComponent({
  name: 'Switch',
  props: switchProps,
  slots: Object as SlotsType<ProSwitchSlots>,
  inheritAttrs: false,
  setup() {
    const {
      value,
      readonly,
    } = useReadonlyHelpers()

    const {
      getMessage,
    } = useLocale('ProSwitch')

    return {
      value,
      readonly,
      getMessage,
    }
  },
  render() {
    if (this.readonly) {
      const { value } = this
      if (this.$slots.readonly) {
        return this.$slots.readonly(this.$props)
      }
      if (value) {
        return this.$slots.checked?.() ?? this.getMessage('checked')
      }
      return this.$slots.unchecked?.() ?? this.getMessage('unchecked')
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
