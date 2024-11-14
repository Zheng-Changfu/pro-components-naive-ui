import type { SlotsType } from 'vue'
import type { ProInputSlots } from './slots'
import { useOverrideProps } from '../../../composables'
import { InternalValueTypeEnum, ProField } from '../field'
import Password from './fields/password'
import { provideTextInstStore } from './inst'
import { proInputProps } from './props'

const name = 'ProPassword'
export default defineComponent({
  name,
  props: proInputProps,
  slots: Object as SlotsType<ProInputSlots>,
  setup(props, { expose }) {
    const {
      exposed,
    } = provideTextInstStore()

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
        defaultValue={null}
        fieldProps={{
          ...this.overridedProps.fieldProps,
          type: 'password',
        }}
        valueType={InternalValueTypeEnum.PASSWORD}
      >
        {{
          ...this.$slots,
          input: (pureProps: any) => (
            <Password
              {...pureProps}
              v-slots={this.$slots}
            />
          ),
        }}
      </ProField>
    )
  },
})
