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
    const passwordInstRef = ref<InputInst>()
    const passwordSlots = useOmitSlots(slots, proPasswordExtendSlotKeys)

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
      type: 'password',
      ruleType: 'string',
      slots: computed(() => slots),
      empty: computed(() => [null, undefined, ''].includes(value.value)),
    } as Partial<ProComponentConfig>

    const passwordProps = computed<InputProps>(() => {
      return {
        'ref': passwordInstRef,
        'pair': false,
        'type': 'password',
        'value': value.value,
        'onUpdateValue': doUpdateValue,
        'onUpdate:value': doUpdateValue,
      }
    })

    const exposed: ProPasswordInstance = {
      blur: () => passwordInstRef.value?.blur(),
      clear: () => passwordInstRef.value?.clear(),
      focus: () => passwordInstRef.value?.focus(),
      select: () => passwordInstRef.value?.select(),
      activate: () => passwordInstRef.value?.activate(),
      deactivate: () => passwordInstRef.value?.deactivate(),
      scrollTo: (options: any) => passwordInstRef.value?.scrollTo(options),
    }

    expose(exposed)
    return {
      stringPath,
      passwordSlots,
      passwordProps,
    }
  },
  render() {
    const {
      $props,
      $attrs,
      stringPath,
      passwordSlots,
      passwordProps,
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
                {...passwordProps}
                v-slots={passwordSlots}
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
