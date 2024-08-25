import type { SlotsType } from 'vue'
import { ProField, ValueTypeEnum } from '../field'
import { proDynamicTagsProps } from './props'
import type { ProDynamicTagsSlots } from './slots'
import ProFieldDynamicTags from './fields/field-dynamic-tags'

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
