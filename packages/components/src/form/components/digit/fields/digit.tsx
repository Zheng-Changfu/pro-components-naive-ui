import type { SlotsType } from 'vue'
import type { ProDigitSlots } from '../slots'
import { inputNumberProps, NFlex, NInputNumber } from 'naive-ui'
import { useReadonlyHelpers } from '../../field'
import { useInjectDigitInstStore } from '../inst'

export default defineComponent({
  name: 'Digit',
  props: inputNumberProps,
  slots: Object as SlotsType<ProDigitSlots>,
  inheritAttrs: false,
  setup() {
    const {
      instRef,
      registerInst,
    } = useInjectDigitInstStore()!

    const {
      empty,
      value,
      readonly,
      emptyText,
    } = useReadonlyHelpers()

    registerInst({
      blur: () => instRef.value?.blur(),
      focus: () => instRef.value?.focus(),
      select: () => instRef.value?.select(),
    })
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
          {$slots.prefix && <span>{this.$slots.prefix()}</span>}
          <span>{value}</span>
          {$slots.suffix && <span>{this.$slots.suffix()}</span>}
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
