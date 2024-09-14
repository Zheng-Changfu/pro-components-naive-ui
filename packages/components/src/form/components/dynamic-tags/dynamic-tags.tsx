import type { SlotsType } from 'vue'
import type { ProDynamicTagsSlots } from './slots'
import { ProField, ValueTypeEnum } from '../field'
import ProFieldDynamicTags from './fields/field-dynamic-tags'
import { proDynamicTagsProps } from './props'

export default defineComponent({
  name: 'ProDynamicTags',
  props: proDynamicTagsProps,
  slots: Object as SlotsType<ProDynamicTagsSlots>,
  setup() { },
  render() {
    return (
      <ProField
        {...this.$props}
        defaultValue={[]}
        valueType={ValueTypeEnum.DYNAMIC_TAGS}
      >
        {{
          ...this.$slots,
          input: (pureProps: any) => {
            return <ProFieldDynamicTags {...pureProps} v-slots={this.$slots} />
          },
        }}
      </ProField>
    )
  },
})
