import type { SlotsType } from 'vue'
import type { ProCheckboxSlots } from './slots'
import { useOverrideProps } from '../../../composables'
import { InternalValueTypeEnum, ProField } from '../field'
import Checkbox from './fields/checkbox'
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

    expose(exposed)
    return {
      overridedProps,
    }
  },
  render() {
    return (
      <ProField
        {...this.overridedProps}
        defaultValue={false}
        valueModelName="checked"
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
