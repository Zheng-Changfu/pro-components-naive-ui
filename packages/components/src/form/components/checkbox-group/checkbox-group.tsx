import type { SlotsType } from 'vue'
import type { ProCheckboxGroupSlots } from './slots'
import { defineComponent } from 'vue'
import { useOverrideProps } from '../../../composables'
import { InternalValueTypeEnum, ProField } from '../field'
import CheckboxGroup from './fields/checkbox-group'
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
        valueType={InternalValueTypeEnum.CHECKBOX_GROUP}
      >
        {{
          ...this.$slots,
          input: (pureProps: any) => {
            return (
              <CheckboxGroup
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
