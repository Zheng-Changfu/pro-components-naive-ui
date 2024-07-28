<script lang='tsx'>
import { NDatePicker, datePickerProps } from 'naive-ui'
import type { SlotsType } from 'vue'
import { defineComponent } from 'vue'
import type { ProDatePickerSlots } from '../slots'
import { useProDatePickerInst } from '../inst'
import { useReadonlyHelpers } from '../../field'

export default defineComponent({
  name: 'FieldDatePicker',
  props: datePickerProps,
  slots: Object as SlotsType<ProDatePickerSlots>,
  setup(_, { expose }) {
    const [
      instRef,
      methods,
    ] = useProDatePickerInst()

    const {
      readonly,
      readonlyText,
    } = useReadonlyHelpers()

    expose(methods)
    return {
      instRef,
      readonly,
      readonlyText,
    }
  },
  render() {
    const {
      $props,
      $slots,
      readonly,
      readonlyText,
    } = this

    if (readonly) {
      return readonlyText
    }

    return (
      <NDatePicker
        ref="instRef"
        {...$props}
        v-slots={$slots}
      />
    )
  },
})
</script>
