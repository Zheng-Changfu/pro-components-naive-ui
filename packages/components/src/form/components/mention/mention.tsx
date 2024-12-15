import type { SlotsType } from 'vue'
import type { ProMentionProps } from './props'
import type { ProMentionSlots } from './slots'
import { defineComponent } from 'vue'
import { useOverrideProps, usePostValue } from '../../../composables'
import { ProField } from '../field'
import { InternalValueTypeEnum } from '../field/enums'
import Mention from './components/mention'
import { provideMentionInstStore } from './inst'
import { proMentionProps } from './props'

const name = 'ProMention'
export default defineComponent({
  name,
  props: proMentionProps,
  slots: Object as SlotsType<ProMentionSlots>,
  setup(props, { expose }) {
    const {
      exposed,
    } = provideMentionInstStore()

    const overridedProps = useOverrideProps<ProMentionProps>(
      name,
      props,
    )

    const postValue = usePostValue(overridedProps, {
      nilToNull: true,
    })

    expose(exposed)
    return {
      postValue,
      overridedProps,
    }
  },
  render() {
    return (
      <ProField
        {...this.overridedProps}
        postValue={this.postValue}
        valueType={InternalValueTypeEnum.MENTION}
      >
        {{
          ...this.$slots,
          input: (pureProps: any) => {
            return (
              <Mention
                {...pureProps}
                v-slots={this.$slots}
              />
            )
          },
        }}
      </ProField>
    )
  },
})
