import type { SlotsType, VNodeChild } from 'vue'
import type { ProDigitSlots } from '../slots'
import { inputNumberProps, NFlex, NInputNumber } from 'naive-ui'
import { defineComponent } from 'vue'
import { useFieldUtils } from '../../field'
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
      emptyDom,
    } = useFieldUtils()

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
      emptyDom,
    }
  },
  render() {
    let dom: VNodeChild

    if (this.readonly) {
      dom = this.empty
        ? this.emptyDom
        : (
            <NFlex size="small">
              {this.$slots.prefix && <span>{this.$slots.prefix()}</span>}
              <span>{this.value}</span>
              {this.$slots.suffix && <span>{this.$slots.suffix()}</span>}
            </NFlex>
          )
    }
    else {
      dom = (
        <NInputNumber
          ref="instRef"
          {...this.$props}
          {...this.$attrs}
          v-slots={this.$slots}
        >
        </NInputNumber>
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
