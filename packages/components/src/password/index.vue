<script lang="tsx">
import type { SlotsType } from 'vue'
import { computed, defineComponent, ref } from 'vue'
import type { InputInst, InputProps } from 'naive-ui'
import { NInput } from 'naive-ui'
import { createField } from 'pro-components-hooks'
import { useOmitSlots } from '../hooks/useOmitSlots'
import type { ProComponentConfig } from '../form'
import { ProComponentConfigKey, ProFormItem, useGetProFieldProps } from '../form'
import { proPasswordProps } from './props'
import type { ProPasswordSlots } from './slots'
import { proPasswordExtendSlotKeys } from './slots'
import type { ProPasswordInstance } from './inst'

export default defineComponent({
  name: 'ProPassword',
  props: proPasswordProps,
  slots: Object as SlotsType<ProPasswordSlots>,
  setup(props, { slots, expose }) {
    const nPasswordInstRef = ref<InputInst>()
    const nPasswordSlots = useOmitSlots(slots, proPasswordExtendSlotKeys)

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
      type: 'ProPassword',
      ruleType: 'string',
      slots: computed(() => slots),
      empty: computed(() => [null, undefined, ''].includes(value.value)),
    } as Partial<ProComponentConfig>

    const nPasswordProps = computed<InputProps>(() => {
      return {
        ref: nPasswordInstRef,
        pair: false,
        type: 'password',
        value: value.value,
        onUpdateValue: doUpdateValue,
      }
    })

    const exposed: ProPasswordInstance = {
      blur: () => nPasswordInstRef.value?.blur(),
      clear: () => nPasswordInstRef.value?.clear(),
      focus: () => nPasswordInstRef.value?.focus(),
      select: () => nPasswordInstRef.value?.select(),
      activate: () => nPasswordInstRef.value?.activate(),
      deactivate: () => nPasswordInstRef.value?.deactivate(),
      scrollTo: (options: any) => nPasswordInstRef.value?.scrollTo(options),
    }

    expose(exposed)
    return {
      stringPath,
      nPasswordSlots,
      nPasswordProps,
    }
  },
  render() {
    const {
      $props,
      $attrs,
      stringPath,
      nPasswordSlots,
      nPasswordProps,
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
                {...nPasswordProps}
                placeholder={placeholder}
                v-slots={nPasswordSlots}
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
