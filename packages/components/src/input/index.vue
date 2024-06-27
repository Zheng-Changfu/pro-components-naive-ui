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
    const nInputInstRef = ref<InputInst>()
    const nInputSlots = useOmitSlots(slots, proInputExtendSlotKeys)

    const proFieldProps = useGetProFieldProps(props)
    const field = createField({ ...proFieldProps, defaultValue: '' })

    const {
      value,
      stringPath,
      doUpdateValue,
    } = field

    /**
     * 注入自定义属性，在 pro-form-item 中完善 ProComponentConfig
     */
    field[ProComponentConfigKey] = {
      type: 'ProInput',
      ruleType: 'string',
      slots: computed(() => slots),
      empty: computed(() => [null, undefined, ''].includes(value.value)),
    } as Partial<ProComponentConfig>

    const nInputProps = computed<InputProps>(() => {
      return {
        ref: nInputInstRef,
        pair: false,
        type: 'text',
        value: value.value,
        onUpdateValue: doUpdateValue,
      }
    })

    const exposed: ProInputInstance = {
      blur: () => nInputInstRef.value?.blur(),
      clear: () => nInputInstRef.value?.clear(),
      focus: () => nInputInstRef.value?.focus(),
      select: () => nInputInstRef.value?.select(),
      activate: () => nInputInstRef.value?.activate(),
      deactivate: () => nInputInstRef.value?.deactivate(),
      scrollTo: (options: any) => nInputInstRef.value?.scrollTo(options),
    }

    expose(exposed)
    return {
      stringPath,
      nInputSlots,
      nInputProps,
    }
  },
  render() {
    const {
      $props,
      $attrs,
      stringPath,
      nInputSlots,
      nInputProps,
    } = this

    return (
      <ProFormItem
        {...$props}
        path={stringPath}
        v-slots={{
          default: ({ fieldProps, placeholder }: any) => {
            return (
              <NInput
                {...$attrs}
                {...fieldProps}
                {...nInputProps}
                placeholder={placeholder}
                v-slots={nInputSlots}
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
