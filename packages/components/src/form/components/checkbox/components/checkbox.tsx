import type { SlotsType } from 'vue'
import type { ProCheckboxSlots } from '../slots'
import { checkboxProps, NCheckbox } from 'naive-ui'
import { defineComponent } from 'vue'
import { useFieldUtils } from '../../field'
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
    } = useFieldUtils()

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
    const disabled = this.readonly
      ? true
      : this.$props.disabled

    const dom = (
      <NCheckbox
        ref="instRef"
        {...this.$props}
        {...this.$attrs}
        disabled={disabled}
        v-slots={this.$slots}
      >
      </NCheckbox>
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
