import type { SlotsType } from 'vue'
import { ProField, ValueTypeEnum } from '../field'
import { proMentionProps } from './props'
import type { ProMentionSlots } from './slots'
import { useMentionInst } from './inst'
import ProFieldMention from './fields/field-mention'

export default defineComponent({
  name: 'ProMention',
  props: proMentionProps,
  slots: Object as SlotsType<ProMentionSlots>,
  setup(_, { expose }) {
    const [
      instRef,
      methods,
    ] = useMentionInst()

    expose(methods)
    return {
      instRef,
    }
  },
  render() {
    return (
      <ProField
        {...this.$props}
        defaultValue={null}
        valueType={ValueTypeEnum.MENTION}
      >
        {{
          ...this.$slots,
          input: (pureProps: any) => {
            return <ProFieldMention ref="instRef" {...pureProps} v-slots={this.$slots} />
          },
        }}
      </ProField>
    )
  },
})
