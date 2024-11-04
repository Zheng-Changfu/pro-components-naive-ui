import type { SlotsType } from 'vue'
import type { ProMentionSlots } from '../slots'
import { mentionProps, NMention } from 'naive-ui'
import { useReadonlyHelpers } from '../../field'
import { useInjectMentionInstStore } from '../inst'

export default defineComponent({
  name: 'Mention',
  props: mentionProps,
  slots: Object as SlotsType<ProMentionSlots>,
  inheritAttrs: false,
  setup() {
    const {
      instRef,
      registerInst,
    } = useInjectMentionInstStore()!

    const {
      readonly,
      readonlyText,
    } = useReadonlyHelpers()

    registerInst({
      blur: () => instRef.value?.blur(),
      focus: () => instRef.value?.focus(),
    })

    return {
      instRef,
      readonly,
      readonlyText,
    }
  },
  render() {
    if (this.readonly) {
      const { readonlyText } = this

      if (this.$slots.readonly) {
        return this.$slots.readonly(this.$props)
      }
      return readonlyText
    }
    return (
      <NMention
        ref="instRef"
        {...this.$props}
        {...this.$attrs}
        v-slots={this.$slots}
      />
    )
  },
})
