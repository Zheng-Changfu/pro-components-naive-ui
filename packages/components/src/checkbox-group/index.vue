<script lang="tsx">
import type { SlotsType } from 'vue'
import { computed, defineComponent, toRef } from 'vue'
import type { CheckboxGroupProps } from 'naive-ui'
import { NCheckbox, NCheckboxGroup, NSpace, NSpin } from 'naive-ui'
import { createField, useCompile } from 'pro-components-hooks'
import { isArray } from 'lodash-es'
import { useOmitSlots } from '../hooks/useOmitSlots'
import type { ProComponentConfig } from '../form'
import { ProComponentConfigKey, ProFormItem, useGetProFieldProps } from '../form'
import { proCheckboxGroupProps } from './props'
import type { ProCheckboxGroupSlots } from './slots'
import { proCheckboxGroupExtendSlotKeys } from './slots'
import { useOptions } from './useOptions'
import type { ProCheckboxGroupInstance } from './inst'

export default defineComponent({
  name: 'ProCheckboxGroup',
  props: proCheckboxGroupProps,
  slots: Object as SlotsType<ProCheckboxGroupSlots>,
  setup(props, { slots, expose }) {
    const checkboxGroupSlots = useOmitSlots(
      slots,
      proCheckboxGroupExtendSlotKeys,
    )

    const proFieldProps = useGetProFieldProps(props)
    const field = createField({ ...proFieldProps, defaultValue: [] })

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
      ruleType: 'array',
      type: 'ProCheckboxGroup',
      slots: computed(() => slots),
      fieldProps: compiledFieldProps,
      empty: computed(() => !isArray(value.value) || value.value.length <= 0),
    } as Partial<ProComponentConfig>

    const checkboxGroupProps = computed<CheckboxGroupProps>(() => {
      return {
        value: value.value,
        onUpdateValue: doUpdateValue,
      }
    })

    const exposed: ProCheckboxGroupInstance = {
      getFetchControls: () => controls,
    }

    expose(exposed)
    return {
      loading,
      options,
      stringPath,
      checkboxGroupProps,
      checkboxGroupSlots,
      spaceProps: compiledSpaceProps,
    }
  },
  render() {
    const {
      $props,
      $attrs,
      loading,
      options,
      stringPath,
      spaceProps,
      checkboxGroupSlots,
      checkboxGroupProps,
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
                      <NCheckboxGroup
                        {...$attrs}
                        {...fieldProps}
                        {...checkboxGroupProps}
                        v-slots={{
                          ...checkboxGroupSlots,
                          default: () => {
                            return (
                              <NSpace
                                {...spaceProps}
                                v-slots={{
                                  default: () => {
                                    return options.map((item) => {
                                      return (
                                        <NCheckbox
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
