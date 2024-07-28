<script lang='tsx'>
import { NCheckbox, checkboxProps } from 'naive-ui'
import type { SlotsType } from 'vue'
import { defineComponent } from 'vue'
import type { ProCheckboxSlots } from '../slots'
import { useProCheckboxInst } from '../inst'
import { useReadonlyHelpers } from '../../field'

export default defineComponent({
  name: 'FieldCheckbox',
  props: checkboxProps,
  slots: Object as SlotsType<ProCheckboxSlots>,
  setup(_, { expose }) {
    const [
      instRef,
      methods,
    ] = useProCheckboxInst()

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
      <NCheckbox
        ref="instRef"
        {...$props}
        v-slots={$slots}
      />
    )
  },
})
</script>
