import type { SlotsType } from 'vue'
import { ProField, ValueTypeEnum } from '../field'
import { proDatePickerProps } from './props'
import type { ProDatePickerSlots } from './slots'
import { useProDatePickerInst } from './inst'
import ProFieldDatePicker from './fields/field-date-picker'

export default defineComponent({
  name: 'ProDateWeek',
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
        ref="instRef"
        {...this.$props}
        defaultValue={null}
        fieldProps={{
          ...(this.$props.fieldProps ?? {}),
          type: 'week',
        }}
        valueType={ValueTypeEnum.DATE_WEEK}
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
