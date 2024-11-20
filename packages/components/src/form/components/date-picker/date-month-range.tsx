import type { SlotsType } from 'vue'
import type { ProDatePickerSlots } from './slots'
import { useOverrideProps } from '../../../composables'
import { InternalValueTypeEnum, ProField } from '../field'
import DatePicker from './fields/date-picker'
import { provideDatePickerInstStore } from './inst'
import { proDatePickerProps } from './props'

const name = 'ProDateMonthRange'
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
          ...(this.overridedProps.fieldProps ?? {}),
          type: 'monthrange',
        }}
        valueType={InternalValueTypeEnum.DATE_MONTH_RANGE}
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
