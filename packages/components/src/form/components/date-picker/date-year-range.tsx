import type { SlotsType } from 'vue'
import type { ProDatePickerSlots } from './slots'
import { useOverrideProps } from '../../../composables'
import { ProField, ValueTypeEnum } from '../field'
import ProFieldDatePicker from './fields/field-date-picker'
import { useProDatePickerInst } from './inst'
import { proDatePickerProps } from './props'

const name = 'ProDateYearRange'
export default defineComponent({
  name,
  props: proDatePickerProps,
  slots: Object as SlotsType<ProDatePickerSlots>,
  setup(props, { expose }) {
    const [
      instRef,
      methods,
    ] = useProDatePickerInst()

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
        fieldProps={{
          ...(this.overridedProps.fieldProps ?? {}),
          type: 'yearrange',
        }}
        valueType={ValueTypeEnum.DATE_YEAR_RANGE}
      >
        {{
          ...this.$slots,
          input: (pureProps: any) => [
            <ProFieldDatePicker
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
