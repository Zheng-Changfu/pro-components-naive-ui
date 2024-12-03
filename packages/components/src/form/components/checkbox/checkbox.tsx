import type { SlotsType } from 'vue'
import type { ProCheckboxSlots } from './slots'
import { defineComponent } from 'vue'
import { useOverrideProps, usePostValue } from '../../../composables'
import { ProField } from '../field'
import { InternalValueTypeEnum } from '../field/enums'
import Checkbox from './components/checkbox'
import { provideCheckboxInstStore } from './inst'
import { proCheckboxProps } from './props'

const name = 'ProCheckbox'
export default defineComponent({
  name,
  props: proCheckboxProps,
  slots: Object as SlotsType<ProCheckboxSlots>,
  setup(props, { expose }) {
    const {
      exposed,
    } = provideCheckboxInstStore()

    const overridedProps = useOverrideProps(
      name,
      props,
    )

    const postValue = usePostValue(overridedProps, {
      nilToFalsy: true,
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
        valueModelName="checked"
        postValue={this.postValue}
        valueType={InternalValueTypeEnum.CHECKBOX}
      >
        {{
          ...this.$slots,
          input: (pureProps: any) => {
            return (
              <Checkbox
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
