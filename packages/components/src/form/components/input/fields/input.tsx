import type { SlotsType } from 'vue'
import type { ProInputSlots } from '../slots'
import { inputProps, NFlex, NInput } from 'naive-ui'
import { computed, defineComponent } from 'vue'
import { useReadonlyHelpers } from '../../field'
import { useInjectTextInstStore } from '../inst'

export default defineComponent({
  name: 'Input',
  props: inputProps,
  slots: Object as SlotsType<ProInputSlots>,
  inheritAttrs: false,
  setup() {
    const {
      instRef,
      registerInst,
    } = useInjectTextInstStore()!

    const {
      empty,
      value,
      readonly,
      emptyText,
    } = useReadonlyHelpers()

    registerInst({
      blur: () => instRef.value?.blur(),
      clear: () => instRef.value?.clear(),
      focus: () => instRef.value?.focus(),
      select: () => instRef.value?.select(),
      activate: () => instRef.value?.activate(),
      deactivate: () => instRef.value?.deactivate(),
      inputElRef: computed(() => instRef.value?.inputElRef) as any,
      wrapperElRef: computed(() => instRef.value?.wrapperElRef) as any,
      textareaElRef: computed(() => instRef.value?.textareaElRef) as any,
      isCompositing: computed(() => instRef.value?.isCompositing) as any,
      scrollTo: (options: ScrollToOptions) => instRef.value?.scrollTo(options),
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
      <NInput
        ref="instRef"
        {...this.$props}
        {...this.$attrs}
        v-slots={this.$slots}
      />
    )
  },
})
