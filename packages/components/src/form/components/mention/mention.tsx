import type { SlotsType } from 'vue'
import type { ProMentionSlots } from './slots'
import { useOverrideProps } from '../../../composables'
import { ProField, ValueTypeEnum } from '../field'
import Mention from './fields/mention'
import { useMentionInst } from './inst'
import { proMentionProps } from './props'

const name = 'ProMention'
export default defineComponent({
  name,
  props: proMentionProps,
  slots: Object as SlotsType<ProMentionSlots>,
  setup(props, { expose }) {
    const [
      instRef,
      methods,
    ] = useMentionInst()

    const overridedProps = useOverrideProps(
      name,
      props,
    )

    expose(methods)
    return {
      instRef,
      overridedProps,
    }
  },
  render() {
    return (
      <ProField
        {...this.overridedProps}
        defaultValue={null}
        valueType={ValueTypeEnum.MENTION}
      >
        {{
          ...this.$slots,
          input: (pureProps: any) => [
            <Mention
              ref="instRef"
              {...pureProps}
              v-slots={this.$slots}
            />,
          ],
        }}
      </ProField>
    )
  },
})
