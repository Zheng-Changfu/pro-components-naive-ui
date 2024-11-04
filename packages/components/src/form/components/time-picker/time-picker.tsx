import type { SlotsType } from 'vue'
import type { ProTimePickerSlots } from './slots'
import { useOverrideProps } from '../../../composables'
import { ProField, ValueTypeEnum } from '../field'
import TimePicker from './fields/time-picker'
import { useProTimePickerInst } from './inst'
import { proTimePickerProps } from './props'

const name = 'ProTime'
export default defineComponent({
  name,
  props: proTimePickerProps,
  slots: Object as SlotsType<ProTimePickerSlots>,
  setup(props, { expose }) {
    const [
      instRef,
      methods,
    ] = useProTimePickerInst()

    const overridedProps = useOverrideProps(
      name,
      props,
    )

    expose(methods)
    return {
      instRef,
      overridedProps,
    }
  },
  render() {
    return (
      <ProField
        {...this.overridedProps}
        defaultValue={null}
        valueType={ValueTypeEnum.TIME}
      >
        {{
          ...this.$slots,
          input: (pureProps: any) => [
            <TimePicker
              ref="instRef"
              {...pureProps}
              v-slots={this.$slots}
            />,
          ],
        }}
      </ProField>
    )
  },
})
