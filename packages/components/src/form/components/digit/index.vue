<script lang='tsx'>
import type { SlotsType } from 'vue'
import { defineComponent } from 'vue'
import type { InputNumberProps } from 'naive-ui'
import type { FieldRenderParameters } from '../field'
import { ProField, ValueTypeEnum } from '../field'
import { proDigitProps } from './props'
import type { ProDigitSlots } from './slots'
import { useProDigitInst } from './inst'
import FieldDigit from './fields/field-digit.vue'

export default defineComponent({
  name: 'ProDigit',
  props: proDigitProps,
  slots: Object as SlotsType<ProDigitSlots>,
  setup(_, { expose }) {
    const [instRef, methods] = useProDigitInst()

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
        valueType={ValueTypeEnum.DIGIT}
        v-slots={{
          ...$slots,
          field: ({
            bindProps,
            bindSlots,
          }: FieldRenderParameters<InputNumberProps, ProDigitSlots>) => {
            return (
              <FieldDigit
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
