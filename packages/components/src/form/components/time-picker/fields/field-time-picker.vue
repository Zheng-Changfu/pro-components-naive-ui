<script lang='tsx'>
import { NTimePicker, timePickerProps } from 'naive-ui'
import type { SlotsType } from 'vue'
import { defineComponent } from 'vue'
import type { ProTimePickerSlots } from '../slots'
import { useProTimePickerInst } from '../inst'
import { useReadonlyHelpers } from '../../field'

export default defineComponent({
  name: 'FieldTimePicker',
  props: timePickerProps,
  slots: Object as SlotsType<ProTimePickerSlots>,
  setup(_, { expose }) {
    const [
      instRef,
      methods,
    ] = useProTimePickerInst()

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
      <NTimePicker
        ref="instRef"
        {...$props}
        v-slots={$slots}
      />
    )
  },
})
</script>
