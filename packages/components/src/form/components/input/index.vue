<script lang='tsx'>
import type { SlotsType } from 'vue'
import { defineComponent } from 'vue'
import type { InputProps } from 'naive-ui'
import type { FieldRenderParameters } from '../field'
import { ProField, ValueTypeEnum } from '../field'
import { proInputProps } from './props'
import type { ProInputSlots } from './slots'
import { useProInputInst } from './inst'
import FieldInput from './field-input.vue'

export default defineComponent({
  name: 'ProInput',
  props: proInputProps,
  slots: Object as SlotsType<ProInputSlots>,
  setup(_, { expose }) {
    const [instRef, methods] = useProInputInst()

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

    return (
      <ProField
        {...$props}
        defaultValue={null}
        valueType={ValueTypeEnum.INPUT}
        v-slots={{
          ...$slots,
          field: ({
            bindProps,
            bindSlots,
          }: FieldRenderParameters<InputProps, ProInputSlots>) => {
            return <FieldInput ref="instRef" {...bindProps} v-slots={bindSlots} />
          },
        }}
      />
    )
  },
})
</script>
