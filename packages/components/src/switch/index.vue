<script lang="tsx">
import type { SlotsType } from 'vue'
import { computed, defineComponent } from 'vue'
import type { SwitchProps } from 'naive-ui'
import { NSwitch } from 'naive-ui'
import { createField } from 'pro-components-hooks'
import { useOmitSlots } from '../hooks/useOmitSlots'
import type { ProComponentConfig } from '../form'
import { ProComponentConfigKey, ProFormItem, useGetProFieldProps } from '../form'
import { proSwitchProps } from './props'
import type { ProSwitchSlots } from './slots'
import { proSwitchExtendSlotKeys } from './slots'

export default defineComponent({
  name: 'ProSwitch',
  props: proSwitchProps,
  slots: Object as SlotsType<ProSwitchSlots>,
  setup(props, { slots }) {
    const switchSlots = useOmitSlots(
      slots,
      proSwitchExtendSlotKeys,
    )

    const proFieldProps = useGetProFieldProps(props)
    const field = createField({ ...proFieldProps, defaultValue: false })

    const {
      value,
      stringPath,
      doUpdateValue,
    } = field

    /**
     * 注入自定义属性，在 pro-form-item 中完善 ProComponentConfig
     */
    field[ProComponentConfigKey] = {
      type: 'ProSwitch',
      slots: computed(() => slots),
      ruleType: ['number', 'string', 'boolean'],
      empty: computed(() => [null, undefined, ''].includes(value.value)),
    } as Partial<ProComponentConfig>

    const switchProps = computed<SwitchProps>(() => {
      return {
        value: value.value,
        onUpdateValue: doUpdateValue,
      }
    })

    return {
      stringPath,
      switchSlots,
      switchProps,
    }
  },
  render() {
    const {
      $props,
      $attrs,
      stringPath,
      switchSlots,
      switchProps,
    } = this

    return (
      <ProFormItem
        {...$props}
        path={stringPath}
        v-slots={{
          default: ({ fieldProps }: any) => {
            return (
              <NSwitch
                {...$attrs}
                {...fieldProps}
                {...switchProps}
                v-slots={switchSlots}
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
