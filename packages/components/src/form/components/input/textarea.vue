<script lang='tsx'>
import type { SlotsType } from 'vue'
import { defineComponent } from 'vue'
import type { InputProps } from 'naive-ui'
import type { FieldRenderParameters } from '../field'
import { ProField, ValueTypeEnum } from '../field'
import { proInputProps } from './props'
import type { ProTextareaSlots } from './slots'
import { useProTextareaInst } from './inst'
import FieldInput from './fields/field-input.vue'

export default defineComponent({
  name: 'ProTextarea',
  props: proInputProps,
  slots: Object as SlotsType<ProTextareaSlots>,
  setup(_, { expose }) {
    const [instRef, methods] = useProTextareaInst()

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
        valueType={ValueTypeEnum.TEXTAREA}
        v-slots={{
          ...$slots,
          field: ({
            bindProps,
            bindSlots,
          }: FieldRenderParameters<InputProps, ProTextareaSlots>) => {
            return (
              <FieldInput
                ref="instRef"
                {...bindProps}
                type="textarea"
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
