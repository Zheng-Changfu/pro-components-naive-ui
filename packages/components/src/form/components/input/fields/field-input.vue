<script lang='tsx'>
import { NInput, inputProps } from 'naive-ui'
import type { SlotsType } from 'vue'
import { defineComponent } from 'vue'
import type { ProInputSlots } from '../slots'
import { useProInputInst } from '../inst'
import { useReadonlyHelpers } from '../../field'

export default defineComponent({
  name: 'FieldInput',
  props: inputProps,
  slots: Object as SlotsType<ProInputSlots>,
  setup(_, { expose }) {
    const [
      instRef,
      methods,
    ] = useProInputInst()

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
      <NInput
        ref="instRef"
        {...$props}
        v-slots={$slots}
      />
    )
  },
})
</script>
