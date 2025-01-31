import type { SlotsType } from 'vue'
import type { ProTimePickerProps } from './props'
import type { ProTimePickerSlots } from './slots'
import { defineComponent } from 'vue'
import { useOverrideProps, usePostValue } from '../../../composables'
import { ProField } from '../field'
import { InternalValueTypeEnum } from '../field/enums'
import TimePicker from './components/time-picker'
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

    const overridedProps = useOverrideProps<ProTimePickerProps>(
      name,
      props,
    )

    const postValue = usePostValue(overridedProps, {
      nilToNull: true,
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
        postValue={this.postValue}
        valueType={InternalValueTypeEnum.TIME}
      >
        {{
          ...this.$slots,
          input: (pureProps: any) => {
            return <TimePicker {...pureProps} v-slots={this.$slots}></TimePicker>
          },
        }}
      </ProField>
    )
  },
})
