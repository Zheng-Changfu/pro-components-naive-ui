<script lang="tsx">
import type { SlotsType } from 'vue'
import { computed, defineComponent } from 'vue'
import type { RateProps } from 'naive-ui'
import { NRate } from 'naive-ui'
import { createField } from 'pro-components-hooks'
import { useOmitSlots } from '../hooks/useOmitSlots'
import type { ProComponentConfig } from '../form'
import { ProComponentConfigKey, ProFormItem, useGetProFieldProps } from '../form'
import { proRateProps } from './props'
import type { ProRateSlots } from './slots'
import { proRateExtendSlotKeys } from './slots'

export default defineComponent({
  name: 'ProRate',
  props: proRateProps,
  slots: Object as SlotsType<ProRateSlots>,
  setup(props, { slots }) {
    const rateSlots = useOmitSlots(slots, proRateExtendSlotKeys)

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
      type: 'ProRate',
      ruleType: 'number',
      slots: computed(() => slots),
      empty: computed(() => [null, undefined].includes(value.value)),
    } as Partial<ProComponentConfig>

    const rateProps = computed<RateProps>(() => {
      return {
        value: value.value,
        onUpdateValue: doUpdateValue,
      }
    })

    return {
      rateSlots,
      rateProps,
      stringPath,
    }
  },
  render() {
    const {
      $props,
      $attrs,
      rateSlots,
      stringPath,
      rateProps,
    } = this

    return (
      <ProFormItem
        {...$props}
        path={stringPath}
        v-slots={{
          default: ({ fieldProps }: any) => {
            return (
              <NRate
                {...$attrs}
                {...fieldProps}
                {...rateProps}
                v-slots={rateSlots}
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
