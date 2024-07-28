<script lang='tsx'>
import { NInputNumber, inputNumberProps } from 'naive-ui'
import type { SlotsType } from 'vue'
import { defineComponent } from 'vue'
import type { ProDigitSlots } from '../slots'
import { useProDigitInst } from '../inst'
import { useReadonlyHelpers } from '../../field'

export default defineComponent({
  name: 'FieldDigit',
  props: inputNumberProps,
  slots: Object as SlotsType<ProDigitSlots>,
  setup(_, { expose }) {
    const [
      instRef,
      methods,
    ] = useProDigitInst()

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
      <NInputNumber
        ref="instRef"
        {...$props}
        v-slots={$slots}
      />
    )
  },
})
</script>
