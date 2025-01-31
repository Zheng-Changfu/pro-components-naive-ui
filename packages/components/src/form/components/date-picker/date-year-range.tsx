import type { SlotsType } from 'vue'
import type { ProDatePickerProps } from './props'
import type { ProDatePickerSlots } from './slots'
import { defineComponent } from 'vue'
import { nilOrEmptyStringToNull } from '../../../_utils/nilOrEmptyStringToNull'
import { useOverrideProps, usePostValue } from '../../../composables'
import { ProField } from '../field'
import { InternalValueTypeEnum } from '../field/enums'
import DatePicker from './components/date-picker'
import { provideDatePickerInstStore } from './inst'
import { proDatePickerProps } from './props'

const name = 'ProDateYearRange'
export default defineComponent({
  name,
  props: proDatePickerProps,
  slots: Object as SlotsType<ProDatePickerSlots>,
  setup(props, { expose }) {
    const {
      exposed,
    } = provideDatePickerInstStore()

    const overridedProps = useOverrideProps<ProDatePickerProps>(
      name,
      props,
    )

    const postValue = usePostValue(overridedProps, {
      transform: nilOrEmptyStringToNull,
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
        fieldProps={{
          ...(this.overridedProps.fieldProps ?? {}),
          type: 'yearrange',
        }}
        postValue={this.postValue}
        valueType={InternalValueTypeEnum.DATE_YEAR_RANGE}
      >
        {{
          ...this.$slots,
          input: (pureProps: any) => {
            return <DatePicker {...pureProps} v-slots={this.$slots}></DatePicker>
          },
        }}
      </ProField>
    )
  },
})
