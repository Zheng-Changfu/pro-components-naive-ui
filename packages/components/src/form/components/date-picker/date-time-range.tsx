import type { SlotsType } from 'vue'
import type { ProDatePickerSlots } from './slots'
import { ProField, ValueTypeEnum } from '../field'
import ProFieldDatePicker from './fields/field-date-picker'
import { useProDatePickerInst } from './inst'
import { proDatePickerProps } from './props'

export default defineComponent({
  name: 'ProDateTimeRange',
  props: proDatePickerProps,
  slots: Object as SlotsType<ProDatePickerSlots>,
  setup(_, { expose }) {
    const [
      instRef,
      methods,
    ] = useProDatePickerInst()
    expose(methods)
    return {
      instRef,
    }
  },
  render() {
    return (
      <ProField
        {...this.$props}
        defaultValue={null}
        fieldProps={{
          ...(this.$props.fieldProps ?? {}),
          type: 'datetimerange',
        }}
        valueType={ValueTypeEnum.DATE_TIME_RANGE}
      >
        {{
          ...this.$slots,
          input: (pureProps: any) => {
            return <ProFieldDatePicker ref="instRef" {...pureProps} v-slots={this.$slots} />
          },
        }}
      </ProField>
    )
  },
})
