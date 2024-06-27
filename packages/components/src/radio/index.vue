<script lang="tsx">
import type { SlotsType } from 'vue'
import { computed, defineComponent } from 'vue'
import type { RadioProps } from 'naive-ui'
import { NRadio } from 'naive-ui'
import { createField } from 'pro-components-hooks'
import { useOmitSlots } from '../hooks/useOmitSlots'
import type { ProComponentConfig } from '../form'
import { ProComponentConfigKey, ProFormItem, useGetProFieldProps } from '../form'
import { proRadioProps } from './props'
import type { ProRadioSlots } from './slots'
import { proRadioExtendSlotKeys } from './slots'

export default defineComponent({
  name: 'ProRadio',
  props: proRadioProps,
  slots: Object as SlotsType<ProRadioSlots>,
  setup(props, { slots }) {
    const nRadioSlots = useOmitSlots(
      slots,
      proRadioExtendSlotKeys,
    )
    const proFieldProps = useGetProFieldProps(props)
    const field = createField({ ...proFieldProps, defaultValue: null })

    const {
      value,
      stringPath,
      doUpdateValue,
    } = field

    field[ProComponentConfigKey] = {
      type: 'ProRadio',
      ruleType: ['string', 'number', 'boolean'],
      slots: computed(() => slots),
      empty: computed(() => [null, undefined, ''].includes(value.value)),
    } as Partial<ProComponentConfig>

    const nRadioProps = computed<RadioProps>(() => {
      return {
        checked: value.value,
        onUpdateChecked: doUpdateValue,
      }
    })

    return {
      stringPath,
      nRadioSlots,
      nRadioProps,
    }
  },
  render() {
    const {
      $props,
      $attrs,
      stringPath,
      nRadioSlots,
      nRadioProps,
    } = this

    return (
      <ProFormItem
        {...$props}
        path={stringPath}
        v-slots={{
          default: ({ fieldProps }: any) => {
            return (
              <NRadio
                {...$attrs}
                {...fieldProps}
                {...nRadioProps}
                v-slots={nRadioSlots}
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
