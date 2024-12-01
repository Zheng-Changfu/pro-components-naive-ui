import type { SlotsType } from 'vue'
import type { ProDatePickerSlots } from './slots'
import { defineComponent } from 'vue'
import { useOverrideProps, usePostValue } from '../../../composables'
import { InternalValueTypeEnum, ProField } from '../field'
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

    const overridedProps = useOverrideProps(
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
            return (
              <DatePicker
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
