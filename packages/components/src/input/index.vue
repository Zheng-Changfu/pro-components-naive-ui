<script lang="tsx">
import type { SlotsType } from 'vue'
import { computed, defineComponent, ref } from 'vue'
import type { InputInst, InputProps } from 'naive-ui'
import { NInput } from 'naive-ui'
import { createField } from 'pro-components-hooks'
import { useOmitSlots } from '../hooks/useOmitSlots'
import type { ProComponentConfig } from '../form'
import { ProComponentConfigKey, ProFormItem, useGetProFieldProps } from '../form'
import { proInputProps } from './props'
import type { ProInputSlots } from './slots'
import { proInputExtendSlotKeys } from './slots'
import type { ProInputInstance } from './inst'

export default defineComponent({
  name: 'ProInput',
  props: proInputProps,
  slots: Object as SlotsType<ProInputSlots>,
  setup(props, { slots, expose }) {
    const inputInstRef = ref<InputInst>()
    const inputSlots = useOmitSlots(slots, proInputExtendSlotKeys)

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
      type: 'input',
      ruleType: 'string',
      slots: computed(() => slots),
      empty: computed(() => [null, undefined, ''].includes(value.value)),
    } as Partial<ProComponentConfig>

    const inputProps = computed<InputProps>(() => {
      return {
        'ref': inputInstRef,
        'pair': false,
        'type': 'text',
        'value': value.value,
        'onUpdateValue': doUpdateValue,
        'onUpdate:value': doUpdateValue,
      }
    })

    const exposed: ProInputInstance = {
      blur: () => inputInstRef.value?.blur(),
      clear: () => inputInstRef.value?.clear(),
      focus: () => inputInstRef.value?.focus(),
      select: () => inputInstRef.value?.select(),
      activate: () => inputInstRef.value?.activate(),
      deactivate: () => inputInstRef.value?.deactivate(),
      scrollTo: (options: any) => inputInstRef.value?.scrollTo(options),
    }

    expose(exposed)
    return {
      stringPath,
      inputSlots,
      inputProps,
    }
  },
  render() {
    const {
      $props,
      $attrs,
      inputSlots,
      stringPath,
      inputProps,
    } = this

    return (
      <ProFormItem
        {...$props}
        path={stringPath}
        v-slots={{
          default: ({ fieldProps }: any) => {
            return (
              <NInput
                {...$attrs}
                {...fieldProps}
                {...inputProps}
                v-slots={inputSlots}
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
