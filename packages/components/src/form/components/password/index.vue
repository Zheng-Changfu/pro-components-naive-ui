<script lang='tsx'>
import type { SlotsType } from 'vue'
import { defineComponent } from 'vue'
import type { InputProps } from 'naive-ui'
import type { FieldRenderParameters } from '../field'
import { ProField, ValueTypeEnum } from '../field'
import { proPasswordProps } from './props'
import type { ProPasswordSlots } from './slots'
import { useProPasswordInst } from './inst'
import FieldPassword from './field-password.vue'

export default defineComponent({
  name: 'ProPassword',
  props: proPasswordProps,
  slots: Object as SlotsType<ProPasswordSlots>,
  setup(_, { expose }) {
    const [instRef, methods] = useProPasswordInst()

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
        valueType={ValueTypeEnum.PASSWORD}
        v-slots={{
          ...$slots,
          field: ({
            bindProps,
            bindSlots,
          }: FieldRenderParameters<InputProps, ProPasswordSlots>) => {
            return (
              <FieldPassword
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
