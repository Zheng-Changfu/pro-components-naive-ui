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
    const nTextareaInstRef = ref<InputInst>()
    const nTextareaSlots = useOmitSlots(slots, proTextareaExtendSlotKeys)

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

    const nTextareaProps = computed<InputProps>(() => {
      return {
        ref: nTextareaInstRef,
        pair: false,
        type: 'textarea',
        value: value.value,
        onUpdateValue: doUpdateValue,
      }
    })

    const exposed: ProTextareaInstance = {
      blur: () => nTextareaInstRef.value?.blur(),
      clear: () => nTextareaInstRef.value?.clear(),
      focus: () => nTextareaInstRef.value?.focus(),
      select: () => nTextareaInstRef.value?.select(),
      activate: () => nTextareaInstRef.value?.activate(),
      deactivate: () => nTextareaInstRef.value?.deactivate(),
      scrollTo: (options: any) => nTextareaInstRef.value?.scrollTo(options),
    }

    expose(exposed)
    return {
      stringPath,
      nTextareaSlots,
      nTextareaProps,
    }
  },
  render() {
    const {
      $props,
      $attrs,
      stringPath,
      nTextareaSlots,
      nTextareaProps,
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
                {...nTextareaProps}
                placeholder={placeholder}
                v-slots={nTextareaSlots}
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
