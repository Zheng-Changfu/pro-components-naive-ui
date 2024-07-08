<script lang="tsx">
import type { SlotsType } from 'vue'
import { computed, defineComponent, ref } from 'vue'
import type { InputNumberInst, InputNumberProps } from 'naive-ui'
import { NInputNumber } from 'naive-ui'
import { resolveField, useField, useFieldBindValues } from '../../field'
import { ProFormItem } from '../../form-item'
import { proDigitProps } from './props'
import type { ProDigitSlots } from './slots'
import type { ProDigitInstance } from './inst'

export default defineComponent({
  name: 'ProDigit',
  props: proDigitProps,
  slots: Object as SlotsType<ProDigitSlots>,
  setup(props, { expose }) {
    const nDigitInstRef = ref<InputNumberInst>()

    const field = useField(
      'ProDigit',
      props,
      { defaultValue: null },
    )

    const bindValues = useFieldBindValues(
      field,
      props,
    )

    const nDigitProps = computed<InputNumberProps>(() => {
      const { value, doUpdateValue } = field
      return {
        ...bindValues.value,
        'ref': nDigitInstRef,
        'value': value.value,
        'defaultValue': undefined,
        'onUpdate:value': undefined,
        'onUpdateValue': doUpdateValue,
      }
    })

    const exposed: ProDigitInstance = {
      blur: () => nDigitInstRef.value?.blur(),
      focus: () => nDigitInstRef.value?.focus(),
      select: () => nDigitInstRef.value?.select(),
    }

    expose(exposed)
    return {
      nDigitProps,
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
                bindValues: this.nDigitProps,
              },
              () => (
                <NInputNumber
                  {...this.nDigitProps}
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
