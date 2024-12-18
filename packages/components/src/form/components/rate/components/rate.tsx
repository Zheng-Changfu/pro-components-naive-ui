import type { SlotsType } from 'vue'
import type { ProRateSlots } from '../slots'
import { NRate, rateProps } from 'naive-ui'
import { defineComponent } from 'vue'
import { useFieldUtils } from '../../field'

export default defineComponent({
  name: 'Rate',
  props: rateProps,
  slots: Object as SlotsType<ProRateSlots>,
  inheritAttrs: false,
  setup() {
    const {
      readonly,
    } = useFieldUtils()

    return {
      readonly,
    }
  },
  render() {
    const rateReadonly = this.readonly
      ? true
      : this.$props.readonly

    const dom = (
      <NRate
        {...this.$props}
        {...this.$attrs}
        readonly={rateReadonly}
        v-slots={this.$slots}
      >
      </NRate>
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
