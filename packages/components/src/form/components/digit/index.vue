<script lang="tsx">
import type { SlotsType } from 'vue'
import { computed, defineComponent, ref } from 'vue'
import type { InputNumberInst, InputNumberProps } from 'naive-ui'
import { NInputNumber } from 'naive-ui'
import { resolveField, useField, useParseFieldProps } from '../../field'
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

    const parsedProps = useParseFieldProps(
      props,
      field,
    )

    const nDigitProps = computed<InputNumberProps>(() => {
      const { value, doUpdateValue } = field
      return {
        ...parsedProps.value,
        'defaultValue': undefined,
        'onUpdate:value': undefined,
        'ref': nDigitInstRef,
        'value': value.value,
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
              $props.fieldRender,
              {
                bindSlots: $slots,
                bindProps: this.nDigitProps,
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
