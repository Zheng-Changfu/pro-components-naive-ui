import type { SlotsType } from 'vue'
import type { ProSelectSlots } from './slots'
import { useOverrideProps } from '../../../composables'
import { ProField, InternalValueTypeEnum } from '../field'
import Select from './fields/select'
import { provideSelectInstStore } from './inst'
import { proSelectProps } from './props'

const name = 'ProSelect'
export default defineComponent({
  name,
  props: proSelectProps,
  slots: Object as SlotsType<ProSelectSlots>,
  setup(props, { expose }) {
    const {
      exposed,
    } = provideSelectInstStore()

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
        valueType={InternalValueTypeEnum.SELECT}
      >
        {{
          ...this.$slots,
          input: (pureProps: any) => (
            <Select
              {...pureProps}
              v-slots={this.$slots}
            />
          ),
        }}
      </ProField>
    )
  },
})
