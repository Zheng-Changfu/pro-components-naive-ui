import { NMention, mentionProps } from 'naive-ui'
import type { SlotsType } from 'vue'
import type { ProMentionSlots } from '../slots'
import { useMentionInst } from '../inst'
import { useReadonlyHelpers } from '../../field'

export default defineComponent({
  name: 'ProFieldMention',
  props: mentionProps,
  slots: Object as SlotsType<ProMentionSlots>,
  inheritAttrs: false,
  setup(_, { expose }) {
    const [
      instRef,
      methods,
    ] = useMentionInst()

    const {
      readonly,
      readonlyText,
    } = useReadonlyHelpers()

    expose(methods)
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
