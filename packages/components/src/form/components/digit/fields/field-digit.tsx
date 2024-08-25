import { NEl, NFlex, NInputNumber, inputNumberProps } from 'naive-ui'
import type { SlotsType } from 'vue'
import type { ProDigitSlots } from '../slots'
import { useProDigitInst } from '../inst'
import { useReadonlyHelpers } from '../../field'

export default defineComponent({
  name: 'ProFieldDigit',
  props: inputNumberProps,
  slots: Object as SlotsType<ProDigitSlots>,
  inheritAttrs: false,
  setup(_, { expose }) {
    const [
      instRef,
      methods,
    ] = useProDigitInst()

    const {
      empty,
      value,
      readonly,
      emptyText,
    } = useReadonlyHelpers()

    expose(methods)
    return {
      empty,
      value,
      instRef,
      readonly,
      emptyText,
    }
  },
  render() {
    if (this.readonly) {
      const { value, empty, emptyText } = this

      if (this.$slots.readonly) {
        return this.$slots.readonly(this.$props)
      }
      if (empty) {
        return emptyText
      }
      return (
        <NFlex size={[8, 0]}>
          <NEl>{this.$slots.prefix?.()}</NEl>
          <NEl>{value}</NEl>
          <NEl>{this.$slots.suffix?.()}</NEl>
        </NFlex>
      )
    }
    return (
      <NInputNumber
        ref="instRef"
        {...this.$props}
        {...this.$attrs}
        v-slots={this.$slots}
      />
    )
  },
})
