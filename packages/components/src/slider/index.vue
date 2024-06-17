<script lang="tsx">
import type { SlotsType } from 'vue'
import { computed, defineComponent } from 'vue'
import type { SliderProps } from 'naive-ui'
import { NSlider } from 'naive-ui'
import { createField } from 'pro-components-hooks'
import { isArray } from 'lodash-es'
import { useOmitSlots } from '../hooks/useOmitSlots'
import type { ProComponentConfig } from '../form'
import { ProComponentConfigKey, ProFormItem, useGetProFieldProps } from '../form'
import { proSliderProps } from './props'
import type { ProSliderSlots } from './slots'
import { proSliderExtendSlotKeys } from './slots'

export default defineComponent({
  name: 'ProSlider',
  props: proSliderProps,
  slots: Object as SlotsType<ProSliderSlots>,
  setup(props, { slots }) {
    const sliderSlots = useOmitSlots(slots, proSliderExtendSlotKeys)

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
      type: 'ProSlider',
      slots: computed(() => slots),
      ruleType: ['number', 'array'],
      empty: computed(() => isArray(value.value)
        ? value.value.length <= 0
        : [null, undefined].includes(value.value),
      ),
    } as Partial<ProComponentConfig>

    const sliderProps = computed<SliderProps>(() => {
      return {
        value: value.value,
        onUpdateValue: doUpdateValue,
      }
    })

    return {
      stringPath,
      sliderSlots,
      sliderProps,
    }
  },
  render() {
    const {
      $props,
      $attrs,
      stringPath,
      sliderSlots,
      sliderProps,
    } = this

    return (
      <ProFormItem
        {...$props}
        path={stringPath}
        v-slots={{
          default: ({ fieldProps }: any) => {
            return (
              <NSlider
                {...$attrs}
                {...fieldProps}
                {...sliderProps}
                v-slots={sliderSlots}
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
