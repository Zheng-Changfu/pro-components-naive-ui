import type { SlotsType } from 'vue'
import type { ProTimePickerSlots } from './slots'
import { useOverrideProps } from '../../../composables'
import { InternalValueTypeEnum, ProField } from '../field'
import TimePicker from './fields/time-picker'
import { provideTimePickerInstStore } from './inst'
import { proTimePickerProps } from './props'

const name = 'ProTime'
export default defineComponent({
  name,
  props: proTimePickerProps,
  slots: Object as SlotsType<ProTimePickerSlots>,
  setup(props, { expose }) {
    const {
      exposed,
    } = provideTimePickerInstStore()

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
        valueType={InternalValueTypeEnum.TIME}
      >
        {{
          ...this.$slots,
          input: (pureProps: any) => {
            return (
              <TimePicker
                ref="instRef"
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
