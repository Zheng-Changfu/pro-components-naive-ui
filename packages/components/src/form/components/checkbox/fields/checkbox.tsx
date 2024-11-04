import type { SlotsType } from 'vue'
import type { ProCheckboxSlots } from '../slots'
import { checkboxProps, NCheckbox } from 'naive-ui'
import { useReadonlyHelpers } from '../../field'
import { useInjectCheckboxInstStore } from '../inst'

export default defineComponent({
  name: 'Checkbox',
  inheritAttrs: false,
  props: checkboxProps,
  slots: Object as SlotsType<ProCheckboxSlots>,
  setup() {
    const {
      instRef,
      registerInst,
    } = useInjectCheckboxInstStore()!

    const {
      readonly,
    } = useReadonlyHelpers()

    registerInst({
      blur: () => instRef.value?.blur(),
      focus: () => instRef.value?.focus(),
    })

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
