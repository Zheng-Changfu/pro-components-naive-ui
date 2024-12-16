import type { SlotsType, VNodeChild } from 'vue'
import type { ProPasswordSlots } from '../slots'
import { EyeInvisibleOutlined, EyeOutlined } from '@vicons/antd'
import { inputProps, NButton, NFlex, NIcon, NInput } from 'naive-ui'
import { computed, defineComponent, ref } from 'vue'
import { useFieldUtils } from '../../field'
import { useInjectTextInstStore } from '../inst'

export default defineComponent({
  name: 'Password',
  props: inputProps,
  slots: Object as SlotsType<ProPasswordSlots>,
  inheritAttrs: false,
  setup() {
    const open = ref(false)

    const {
      instRef,
      registerInst,
    } = useInjectTextInstStore()!

    const {
      empty,
      value,
      readonly,
      emptyDom,
    } = useFieldUtils()

    function setOpen(v: boolean) {
      open.value = v
    }

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
      open,
      empty,
      value,
      instRef,
      setOpen,
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
            <NFlex align="center" wrap={false}>
              {this.open ? this.value : '********'}
              <NButton type="primary" text={true} onClick={() => this.setOpen(!this.open)}>
                <NIcon size={16}>
                  {this.open ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                </NIcon>
              </NButton>
            </NFlex>
          )
    }
    else {
      dom = (
        <NInput
          ref="instRef"
          {...this.$props}
          {...this.$attrs}
        >
          {this.$slots}
        </NInput>
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
