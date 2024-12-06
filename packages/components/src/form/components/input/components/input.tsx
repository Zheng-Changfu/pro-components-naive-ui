import type { SlotsType, VNodeChild } from 'vue'
import type { ProInputSlots } from '../slots'
import { inputProps, NFlex, NInput } from 'naive-ui'
import { computed, defineComponent } from 'vue'
import { useFieldUtils } from '../../field'
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
    } = useFieldUtils()

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
    let dom: VNodeChild

    if (this.readonly) {
      dom = this.empty
        ? this.emptyText
        : (
            <NFlex size={[8, 0]}>
              {this.$slots.prefix && <span>{this.$slots.prefix()}</span>}
              <span>{this.value}</span>
              {this.$slots.suffix && <span>{this.$slots.suffix()}</span>}
            </NFlex>
          )
    }
    else {
      dom = (
        <NInput
          ref="instRef"
          {...this.$props}
          {...this.$attrs}
          v-slots={this.$slots}
        />
      )
    }

    return this.$slots.input
      ? this.$slots.input({
        inputDom: dom,
        readonly: this.readonly,
        inputProps: this.$props,
      })
      : dom
  },
})
