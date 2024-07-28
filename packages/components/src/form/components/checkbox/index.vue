<script lang='tsx'>
import type { SlotsType } from 'vue'
import { defineComponent } from 'vue'
import type { CheckboxProps } from 'naive-ui'
import type { FieldRenderParameters } from '../field'
import { ProField, ValueTypeEnum } from '../field'
import { proCheckboxProps } from './props'
import type { ProCheckboxSlots } from './slots'
import { useProCheckboxInst } from './inst'
import FieldCheckbox from './fields/field-checkbox.vue'

export default defineComponent({
  name: 'ProCheckbox',
  props: proCheckboxProps,
  slots: Object as SlotsType<ProCheckboxSlots>,
  setup(_, { expose }) {
    const [instRef, methods] = useProCheckboxInst()

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
        defaultValue={false}
        valueModelName="checked"
        valueType={ValueTypeEnum.CHECKBOX}
        v-slots={{
          ...$slots,
          field: ({
            bindProps,
            bindSlots,
          }: FieldRenderParameters<CheckboxProps, ProCheckboxSlots>) => {
            return (
              <FieldCheckbox
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
