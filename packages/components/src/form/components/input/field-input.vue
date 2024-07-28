<script lang='tsx'>
import { NInput, inputProps } from 'naive-ui'
import type { SlotsType } from 'vue'
import { defineComponent } from 'vue'
import { useReadonlyHelpers } from '../field'
import type { ProInputSlots } from './slots'
import { useProInputInst } from './inst'

export default defineComponent({
  name: 'FieldInput',
  props: inputProps,
  slots: Object as SlotsType<ProInputSlots>,
  setup(_, { expose }) {
    const [
      nInputInstRef,
      methods,
    ] = useProInputInst()

    const {
      readonly,
      readonlyText,
    } = useReadonlyHelpers()

    expose(methods)
    return {
      readonly,
      readonlyText,
      nInputInstRef,
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
        ref="nInputInstRef"
        {...$props}
        type="text"
        v-slots={$slots}
      />
    )
  },
})
</script>
