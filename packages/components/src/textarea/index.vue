<script lang="tsx">
import type { SlotsType } from 'vue'
import { computed, defineComponent, ref } from 'vue'
import type { InputInst, InputProps } from 'naive-ui'
import { NInput } from 'naive-ui'
import { createField } from 'pro-components-hooks'
import { useOmitSlots } from '../hooks/useOmitSlots'
import type { ProComponentConfig } from '../form'
import { ProComponentConfigKey, ProFormItem, useGetProFieldProps } from '../form'
import { proTextareaProps } from './props'
import type { ProTextareaSlots } from './slots'
import { proTextareaExtendSlotKeys } from './slots'
import type { ProTextareaInstance } from './inst'

export default defineComponent({
  name: 'ProTextarea',
  props: proTextareaProps,
  slots: Object as SlotsType<ProTextareaSlots>,
  setup(props, { slots, expose }) {
    const textareaInstRef = ref<InputInst>()
    const textareaSlots = useOmitSlots(slots, proTextareaExtendSlotKeys)

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
      type: 'ProTextarea',
      ruleType: 'string',
      slots: computed(() => slots),
      empty: computed(() => [null, undefined, ''].includes(value.value)),
    } as Partial<ProComponentConfig>

    const textareaProps = computed<InputProps>(() => {
      return {
        ref: textareaInstRef,
        pair: false,
        type: 'textarea',
        value: value.value,
        onUpdateValue: doUpdateValue,
      }
    })

    const exposed: ProTextareaInstance = {
      blur: () => textareaInstRef.value?.blur(),
      clear: () => textareaInstRef.value?.clear(),
      focus: () => textareaInstRef.value?.focus(),
      select: () => textareaInstRef.value?.select(),
      activate: () => textareaInstRef.value?.activate(),
      deactivate: () => textareaInstRef.value?.deactivate(),
      scrollTo: (options: any) => textareaInstRef.value?.scrollTo(options),
    }

    expose(exposed)
    return {
      stringPath,
      textareaSlots,
      textareaProps,
    }
  },
  render() {
    const {
      $props,
      $attrs,
      stringPath,
      textareaSlots,
      textareaProps,
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
                {...textareaProps}
                placeholder={placeholder}
                v-slots={textareaSlots}
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
