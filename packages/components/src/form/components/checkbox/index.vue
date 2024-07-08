<script lang="tsx">
import type { SlotsType } from 'vue'
import { computed, defineComponent, ref } from 'vue'
import type { CheckboxInst, CheckboxProps } from 'naive-ui'
import { NCheckbox } from 'naive-ui'
import { resolveField, useField, useFieldBindValues } from '../../field'
import { ProFormItem } from '../../form-item'
import { proCheckboxProps } from './props'
import type { ProCheckboxSlots } from './slots'
import type { ProCheckboxInstance } from './inst'

export default defineComponent({
  name: 'ProCheckbox',
  props: proCheckboxProps,
  slots: Object as SlotsType<ProCheckboxSlots>,
  setup(props, { expose }) {
    const nCheckboxInst = ref<CheckboxInst>()

    const field = useField(
      'ProCheckbox',
      props,
      { defaultValue: false },
    )

    const {
      bindValues,
    } = useFieldBindValues(field, props)

    const nCheckboxProps = computed<CheckboxProps>(() => {
      const { value, doUpdateValue } = field
      return {
        ...bindValues.value as any,
        'defaultChecked': undefined,
        'onUpdate:checked': undefined,

        'ref': nCheckboxInst,
        'checked': value.value,
        'onUpdateChecked': doUpdateValue,
      }
    })

    const exposed: ProCheckboxInstance = {
      blur: () => nCheckboxInst.value?.blur(),
      focus: () => nCheckboxInst.value?.focus(),
    }

    expose(exposed)
    return {
      nCheckboxProps,
    }
  },
  render() {
    const {
      $props,
      $slots,
    } = this

    return (
      <ProFormItem
        {...$props}
        v-slots={{
          default: () => {
            return resolveField(
              $props.renderField,
              {
                bindSlots: $slots,
                bindValues: this.nCheckboxProps,
              },
              () => (
                <NCheckbox
                  {...this.nCheckboxProps}
                  v-slots={$slots}
                />
              ),
            )
          },
        }}
      >
      </ProFormItem>
    )
  },
})
</script>
