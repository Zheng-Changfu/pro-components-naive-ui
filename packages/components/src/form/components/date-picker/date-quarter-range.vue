<script lang='tsx'>
import type { SlotsType } from 'vue'
import { defineComponent } from 'vue'
import type { DatePickerProps } from 'naive-ui'
import type { FieldRenderParameters } from '../field'
import { ProField, ValueTypeEnum } from '../field'
import { proDatePickerProps } from './props'
import type { ProDatePickerSlots } from './slots'
import { useProDatePickerInst } from './inst'
import FieldDatePicker from './fields/field-date-picker.vue'
import { convertStringArrayToTimestampArray } from './utils/timestamp'

export default defineComponent({
  name: 'ProDateQuarterRange',
  props: proDatePickerProps,
  slots: Object as SlotsType<ProDatePickerSlots>,
  setup(_, { expose }) {
    const [instRef, methods] = useProDatePickerInst()
    expose(methods)
    return {
      instRef,
    }
  },
  render() {
    const {
      $props,
      $slots,
    } = this

    function postState(val: any) {
      return convertStringArrayToTimestampArray(val, $props.postState)
    }

    return (
      <ProField
        {...$props}
        defaultValue={null}
        postState={postState}
        valueType={ValueTypeEnum.DATE_QUARTER_RANGE}
        v-slots={{
          ...$slots,
          field: ({
            bindProps,
            bindSlots,
          }: FieldRenderParameters<DatePickerProps, ProDatePickerSlots>) => {
            const { placeholder } = bindProps
            const [sp, ep] = placeholder ?? []
            return (
              <FieldDatePicker
                ref="instRef"
                {...bindProps}
                type="quarterrange"
                endPlaceholder={ep}
                startPlaceholder={sp}
                v-slots={bindSlots}
              />
            )
          },
        }}
      />
    )
  },
})
</script>
