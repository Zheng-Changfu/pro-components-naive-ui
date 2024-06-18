<script lang="tsx">
import type { SlotsType } from 'vue'
import { computed, defineComponent, toRef } from 'vue'
import type { RadioGroupProps } from 'naive-ui'
import { NRadio, NRadioGroup, NSpace, NSpin } from 'naive-ui'
import { createField, useCompile } from 'pro-components-hooks'
import { useOmitSlots } from '../hooks/useOmitSlots'
import type { ProComponentConfig } from '../form'
import { ProComponentConfigKey, ProFormItem, useGetProFieldProps } from '../form'
import { proRadioGroupProps } from './props'
import type { ProRadioGroupSlots } from './slots'
import { proRadioGroupExtendSlotKeys } from './slots'
import { useOptions } from './useOptions'
import type { ProRadioGroupInstance } from './inst'

export default defineComponent({
  name: 'ProRadioGroup',
  props: proRadioGroupProps,
  slots: Object as SlotsType<ProRadioGroupSlots>,
  setup(props, { slots, expose }) {
    const radioGroupSlots = useOmitSlots(slots, proRadioGroupExtendSlotKeys)

    const proFieldProps = useGetProFieldProps(props)
    const field = createField({
      ...proFieldProps,
      defaultValue: null,
    })

    const {
      value,
      scope,
      stringPath,
      doUpdateValue,
    } = field

    /**
     * 可在表单组件层编译，也可以在 form-item 中编译
     */
    const compiledFieldProps = useCompile(
      toRef(props, 'fieldProps'),
      { scope },
    )

    const compiledSpaceProps = useCompile(
      toRef(props, 'spaceProps'),
      { scope },
    )

    const {
      loading,
      options,
      controls,
    } = useOptions(props, compiledFieldProps)

    field[ProComponentConfigKey] = {
      type: 'ProRadioGroup',
      ruleType: ['string', 'number'],
      fieldProps: compiledFieldProps,
      slots: computed(() => slots),
      empty: computed(() => [null, undefined, ''].includes(value.value),
      ),
    } as Partial<ProComponentConfig>

    const radioGroupProps = computed<RadioGroupProps>(() => {
      return {
        value: value.value,
        onUpdateValue: doUpdateValue,
      }
    })

    const exposed: ProRadioGroupInstance = {
      getFetchControls: () => controls,
    }

    expose(exposed)
    return {
      loading,
      options,
      stringPath,
      radioGroupProps,
      radioGroupSlots,
      spaceProps: compiledSpaceProps,
    }
  },
  render() {
    const {
      $props,
      $attrs,
      loading,
      options,
      spaceProps,
      stringPath,
      radioGroupSlots,
      radioGroupProps,
    } = this

    return (
      <ProFormItem
        {...$props}
        path={stringPath}
        v-slots={{
          default: ({ fieldProps }: any) => {
            return (
              <NSpin
                show={loading}
                {...$props.spinProps}
                v-slots={{
                  default: () => {
                    return (
                      <NRadioGroup
                        {...$attrs}
                        {...fieldProps}
                        {...radioGroupProps}
                        v-slots={{
                          ...radioGroupSlots,
                          default: () => {
                            return (
                              <NSpace
                                {...spaceProps}
                                v-slots={{
                                  default: () => {
                                    return options.map((item) => {
                                      return (
                                        <NRadio
                                          {...item}
                                          key={item.value}
                                        />
                                      )
                                    })
                                  },
                                }}
                              />
                            )
                          },
                        }}
                      />
                    )
                  },
                }}
              >
              </NSpin>
            )
          },
        }}
      >
      </ProFormItem>
    )
  },
})
</script>
