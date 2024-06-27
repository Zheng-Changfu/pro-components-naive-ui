<script lang="tsx">
import type { SlotsType } from 'vue'
import { computed, defineComponent, toRef } from 'vue'
import type { TransferProps } from 'naive-ui'
import { NSpin, NTransfer } from 'naive-ui'
import { createField, useCompile } from 'pro-components-hooks'
import { isArray } from 'lodash-es'
import type { ProComponentConfig } from '../form'
import { ProComponentConfigKey, ProFormItem, useGetProFieldProps } from '../form'
import { proTransferProps } from './props'
import type { ProTransferSlots } from './slots'
import { useOptions } from './useOptions'
import type { ProTransferInstance } from './inst'

export default defineComponent({
  name: 'ProTransfer',
  props: proTransferProps,
  slots: Object as SlotsType<ProTransferSlots>,
  setup(props, { slots, expose }) {
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

    const {
      options,
      loading,
      controls,
    } = useOptions(props, compiledFieldProps)

    /**
     * 注入自定义属性，在 pro-form-item 中完善 ProComponentConfig
     */
    field[ProComponentConfigKey] = {
      ruleType: 'array',
      type: 'ProTransfer',
      fieldProps: compiledFieldProps,
      slots: computed(() => slots),
      empty: computed(() => !isArray(value.value) || value.value.length <= 0),
    } as Partial<ProComponentConfig>

    const nTransferProps = computed<TransferProps>(() => {
      return {
        value: value.value,
        onUpdateValue: doUpdateValue,
      }
    })

    const exposed: ProTransferInstance = {
      getFetchControls: () => controls,
    }

    expose(exposed)
    return {
      options,
      loading,
      stringPath,
      nTransferProps,
    }
  },
  render() {
    const {
      $props,
      $attrs,
      options,
      loading,
      stringPath,
      nTransferProps,
    } = this

    return (
      <ProFormItem
        {...$props}
        path={stringPath}
        v-slots={{
          default: ({ fieldProps, placeholder }: any) => {
            const [s, t] = placeholder ?? []
            return (
              <NSpin
                show={loading}
                {...$props.spinProps}
                v-slots={{
                  default: () => {
                    return (
                      <NTransfer
                        {...$attrs}
                        {...fieldProps}
                        {...nTransferProps}
                        options={options}
                        sourceFilterPlaceholder={s}
                        targetFilterPlaceholder={t}
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
