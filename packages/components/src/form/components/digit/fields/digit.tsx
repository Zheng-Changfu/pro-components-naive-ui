import type { SlotsType } from 'vue'
import type { ProDigitSlots } from '../slots'
import { inputNumberProps, NEl, NFlex, NInputNumber } from 'naive-ui'
import { useReadonlyHelpers } from '../../field'
import { useProDigitInst } from '../inst'

export default defineComponent({
  name: 'Digit',
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
      const { value, empty, emptyText, $slots } = this

      if ($slots.readonly) {
        return $slots.readonly(this.$props)
      }
      if (empty) {
        return emptyText
      }
      return (
        <NFlex size={[8, 0]}>
          {$slots.prefix && <NEl>{this.$slots.prefix()}</NEl>}
          <NEl>{value}</NEl>
          {$slots.suffix && <NEl>{this.$slots.suffix()}</NEl>}
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
