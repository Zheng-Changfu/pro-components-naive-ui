import type { SlotsType, VNodeChild } from 'vue'
import type { ProSwitchSlots } from '../slots'
import { NSwitch, switchProps } from 'naive-ui'
import { defineComponent } from 'vue'
import { useLocale } from '../../../../locales'
import { useFieldUtils } from '../../field'

export default defineComponent({
  name: 'Switch',
  props: switchProps,
  slots: Object as SlotsType<ProSwitchSlots>,
  inheritAttrs: false,
  setup() {
    const {
      value,
      readonly,
    } = useFieldUtils()

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
    let dom: VNodeChild

    if (this.readonly) {
      dom = this.value
        ? this.$slots.checked?.() ?? this.getMessage('checked')
        : this.$slots.unchecked?.() ?? this.getMessage('unchecked')
    }
    else {
      dom = (
        <NSwitch
          {...this.$props}
          {...this.$attrs}
          v-slots={this.$slots}
        />
      )
    }

    return this.$slots.input
      ? this.$slots.input({
        inputDom: dom,
        readonly: this.readonly,
        inputProps: this.$props,
      })
      : dom
  },
})
