import type { SlotsType } from 'vue'
import type { ProCheckboxSlots } from '../slots'
import { checkboxProps, NCheckbox } from 'naive-ui'
import { useReadonlyHelpers } from '../../field'
import { useProCheckboxInst } from '../inst'

export default defineComponent({
  name: 'ProFieldCheckbox',
  inheritAttrs: false,
  props: checkboxProps,
  slots: Object as SlotsType<ProCheckboxSlots>,
  setup(_, { expose }) {
    const [
      instRef,
      methods,
    ] = useProCheckboxInst()

    const {
      readonly,
    } = useReadonlyHelpers()

    expose(methods)
    return {
      instRef,
      readonly,
    }
  },
  render() {
    if (this.readonly) {
      if (this.$slots.readonly) {
        return this.$slots.readonly(this.$props)
      }
      return (
        <NCheckbox
          {...this.$props}
          {...this.$attrs}
          disabled={true}
          v-slots={this.$slots}
        />
      )
    }
    return (
      <NCheckbox
        ref="instRef"
        {...this.$props}
        {...this.$attrs}
        v-slots={this.$slots}
      />
    )
  },
})
