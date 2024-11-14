import type { SlotsType } from 'vue'
import type { ProDynamicTagsSlots } from './slots'
import { useOverrideProps } from '../../../composables'
import { ProField, InternalValueTypeEnum } from '../field'
import DynamicTags from './fields/dynamic-tags'
import { proDynamicTagsProps } from './props'

const name = 'ProDynamicTags'
export default defineComponent({
  name,
  props: proDynamicTagsProps,
  slots: Object as SlotsType<ProDynamicTagsSlots>,
  setup(props) {
    const overridedProps = useOverrideProps(
      name,
      props,
    )

    return {
      overridedProps,
    }
  },
  render() {
    return (
      <ProField
        {...this.overridedProps}
        defaultValue={[]}
        valueType={InternalValueTypeEnum.DYNAMIC_TAGS}
      >
        {{
          ...this.$slots,
          input: (pureProps: any) => (
            <DynamicTags
              {...pureProps}
              v-slots={this.$slots}
            />
          ),
        }}
      </ProField>
    )
  },
})
