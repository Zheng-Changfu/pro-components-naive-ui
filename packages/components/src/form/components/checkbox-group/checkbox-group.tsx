import type { SlotsType } from 'vue'
import type { ProCheckboxGroupSlots } from './slots'
import { useOverrideProps } from '../../../composables'
import { ProField, ValueTypeEnum } from '../field'
import ProFieldCheckboxGroup from './fields/field-checkbox-group'
import { proCheckboxGroupProps } from './props'

const name = 'ProCheckboxGroup'
export default defineComponent({
  name,
  props: proCheckboxGroupProps,
  slots: Object as SlotsType<ProCheckboxGroupSlots>,
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
        valueType={ValueTypeEnum.CHECKBOX_GROUP}
      >
        {{
          ...this.$slots,
          input: (pureProps: any) => [
            <ProFieldCheckboxGroup
              {...pureProps}
              v-slots={this.$slots}
            />,
          ],
        }}
      </ProField>
    )
  },
})
