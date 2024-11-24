import type { SlotsType } from 'vue'
import type { ProRateSlots } from '../slots'
import { NRate, rateProps } from 'naive-ui'
import { defineComponent } from 'vue'
import { useReadonlyHelpers } from '../../field'

export default defineComponent({
  name: 'Rate',
  props: rateProps,
  slots: Object as SlotsType<ProRateSlots>,
  inheritAttrs: false,
  setup() {
    const {
      readonly,
    } = useReadonlyHelpers()

    return {
      readonly,
    }
  },
  render() {
    if (this.readonly) {
      if (this.$slots.readonly) {
        return this.$slots.readonly(this.$props)
      }
      return (
        <NRate
          {...this.$props}
          {...this.$attrs}
          readonly={true}
          v-slots={this.$slots}
        />
      )
    }
    return (
      <NRate
        {...this.$props}
        {...this.$attrs}
        v-slots={this.$slots}
      />
    )
  },
})
