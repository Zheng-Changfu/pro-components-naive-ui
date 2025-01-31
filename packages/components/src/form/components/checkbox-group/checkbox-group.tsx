import type { SlotsType } from 'vue'
import type { ProCheckboxGroupProps } from './props'
import type { ProCheckboxGroupSlots } from './slots'
import { defineComponent } from 'vue'
import { useOverrideProps, usePostValue } from '../../../composables'
import { ProField } from '../field'
import { InternalValueTypeEnum } from '../field/enums'
import CheckboxGroup from './components/checkbox-group'
import { proCheckboxGroupProps } from './props'

const name = 'ProCheckboxGroup'
export default defineComponent({
  name,
  props: proCheckboxGroupProps,
  slots: Object as SlotsType<ProCheckboxGroupSlots>,
  setup(props) {
    const overridedProps = useOverrideProps<ProCheckboxGroupProps>(
      name,
      props,
    )

    const postValue = usePostValue(overridedProps, {
      nilToEmptyArray: true,
    })

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
        valueType={InternalValueTypeEnum.CHECKBOX_GROUP}
      >
        {{
          ...this.$slots,
          input: (pureProps: any) => {
            return <CheckboxGroup {...pureProps} v-slots={this.$slots}></CheckboxGroup>
          },
        }}
      </ProField>
    )
  },
})
