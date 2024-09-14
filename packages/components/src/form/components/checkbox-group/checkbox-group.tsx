import type { SlotsType } from 'vue'
import type { ProCheckboxGroupSlots } from './slots'
import { ProField, ValueTypeEnum } from '../field'
import ProFieldCheckboxGroup from './fields/field-checkbox-group'
import { proCheckboxGroupProps } from './props'

export default defineComponent({
  name: 'ProCheckboxGroup',
  props: proCheckboxGroupProps,
  slots: Object as SlotsType<ProCheckboxGroupSlots>,
  setup() {},
  render() {
    return (
      <ProField
        {...this.$props}
        defaultValue={[]}
        valueType={ValueTypeEnum.CHECKBOX_GROUP}
      >
        {{
          ...this.$slots,
          input: (pureProps: any) => {
            return <ProFieldCheckboxGroup {...pureProps} v-slots={this.$slots} />
          },
        }}
      </ProField>
    )
  },
})
