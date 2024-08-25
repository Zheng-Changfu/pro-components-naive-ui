import { NEl, NFlex, NInput, inputProps } from 'naive-ui'
import type { SlotsType } from 'vue'
import { useProInputInst } from '../inst'
import type { ProInputSlots } from '../slots'
import { useReadonlyHelpers } from '../../field'

export default defineComponent({
  name: 'ProFieldInput',
  props: inputProps,
  slots: Object as SlotsType<ProInputSlots>,
  inheritAttrs: false,
  setup(_, { expose }) {
    const [
      instRef,
      methods,
    ] = useProInputInst()

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
      <NInput
        ref="instRef"
        {...this.$props}
        {...this.$attrs}
        v-slots={this.$slots}
      />
    )
  },
})
