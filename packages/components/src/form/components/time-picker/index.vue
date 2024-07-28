<script lang="tsx">
import type { SlotsType } from 'vue'
import { defineComponent } from 'vue'
import type { TimePickerProps } from 'naive-ui'
import type { FieldRenderParameters } from '../field'
import { ProField, ValueTypeEnum } from '../field'
import { convertStringToTimestamp } from '../date-picker/utils/timestamp'
import { proTimePickerProps } from './props'
import type { ProTimePickerSlots } from './slots'
import { useProTimePickerInst } from './inst'
import FieldTimePicker from './fields/field-time-picker.vue'

export default defineComponent({
  name: 'ProDateTime',
  props: proTimePickerProps,
  slots: Object as SlotsType<ProTimePickerSlots>,
  setup(_, { expose }) {
    const [instRef, methods] = useProTimePickerInst()

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
      return convertStringToTimestamp(val, $props.postState)
    }

    return (
      <ProField
        {...$props}
        defaultValue={null}
        postState={postState}
        valueType={ValueTypeEnum.DATE_TIME}
        v-slots={{
          ...$slots,
          field: ({
            bindProps,
            bindSlots,
          }: FieldRenderParameters<TimePickerProps, ProTimePickerSlots>) => {
            return (
              <FieldTimePicker
                ref="instRef"
                {...bindProps}
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
