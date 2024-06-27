<script lang="tsx">
import type { SlotsType } from 'vue'
import { computed, defineComponent, ref } from 'vue'
import type { InputNumberInst, InputNumberProps } from 'naive-ui'
import { NInputNumber } from 'naive-ui'
import { createField } from 'pro-components-hooks'
import { useOmitSlots } from '../hooks/useOmitSlots'
import type { ProComponentConfig } from '../form'
import { ProComponentConfigKey, ProFormItem, useGetProFieldProps } from '../form'
import { proDigitProps } from './props'
import type { ProDigitSlots } from './slots'
import { proDigitExtendSlotKeys } from './slots'
import type { ProDigitInstance } from './inst'

export default defineComponent({
  name: 'ProDigit',
  props: proDigitProps,
  slots: Object as SlotsType<ProDigitSlots>,
  setup(props, { slots, expose }) {
    const nDigitInstRef = ref<InputNumberInst>()
    const nDigitSlots = useOmitSlots(slots, proDigitExtendSlotKeys)

    const proFieldProps = useGetProFieldProps(props)
    const field = createField({ ...proFieldProps, defaultValue: null })

    const {
      value,
      stringPath,
      doUpdateValue,
    } = field

    /**
     * 注入自定义属性，在 pro-form-item 中完善 ProComponentConfig
     */
    field[ProComponentConfigKey] = {
      type: 'ProDigit',
      ruleType: 'number',
      slots: computed(() => slots),
      empty: computed(() => [null, undefined].includes(value.value)),
    } as Partial<ProComponentConfig>

    const nDigitProps = computed<InputNumberProps>(() => {
      return {
        ref: nDigitInstRef,
        value: value.value,
        onUpdateValue: doUpdateValue,
      }
    })

    const exposed: ProDigitInstance = {
      blur: () => nDigitInstRef.value?.blur(),
      focus: () => nDigitInstRef.value?.focus(),
      select: () => nDigitInstRef.value?.select(),
    }

    expose(exposed)
    return {
      stringPath,
      nDigitSlots,
      nDigitProps,
    }
  },
  render() {
    const {
      $props,
      $attrs,
      stringPath,
      nDigitSlots,
      nDigitProps,
    } = this

    return (
      <ProFormItem
        {...$props}
        path={stringPath}
        v-slots={{
          default: ({ fieldProps, placeholder }: any) => {
            return (
              <NInputNumber
                {...$attrs}
                {...fieldProps}
                {...nDigitProps}
                placeholder={placeholder}
                v-slots={nDigitSlots}
              />
            )
          },
        }}
      >
      </ProFormItem>
    )
  },
})
</script>
