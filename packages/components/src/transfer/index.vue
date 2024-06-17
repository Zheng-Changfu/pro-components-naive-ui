<script lang="tsx">
import type { SlotsType } from 'vue'
import { computed, defineComponent } from 'vue'
import type { TransferProps } from 'naive-ui'
import { NTransfer } from 'naive-ui'
import { createField } from 'pro-components-hooks'
import { isArray } from 'lodash-es'
import type { ProComponentConfig } from '../form'
import { ProComponentConfigKey, ProFormItem, useGetProFieldProps } from '../form'
import { proTransferProps } from './props'
import type { ProTransferSlots } from './slots'
import { useOptions } from './useOptions'

export default defineComponent({
  name: 'ProTransfer',
  props: proTransferProps,
  slots: Object as SlotsType<ProTransferSlots>,
  setup(props, { slots }) {
    const proFieldProps = useGetProFieldProps(props)
    const field = createField({ ...proFieldProps, defaultValue: false })

    const {
      value,
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

    const { options } = useOptions(
      props,
      compiledFieldProps,
    )

    /**
     * 注入自定义属性，在 pro-form-item 中完善 ProComponentConfig
     */
    field[ProComponentConfigKey] = {
      ruleType: 'array',
      type: 'ProTransfer',
      slots: computed(() => slots),
      empty: computed(() => !isArray(value.value) || value.value.length <= 0),
    } as Partial<ProComponentConfig>

    const transferProps = computed<TransferProps>(() => {
      return {
        value: value.value,
        onUpdateValue: doUpdateValue,
      }
    })

    return {
      options,
      stringPath,
      transferProps,
    }
  },
  render() {
    const {
      $props,
      $attrs,
      options,
      stringPath,
      transferProps,
    } = this

    return (
      <ProFormItem
        {...$props}
        path={stringPath}
        v-slots={{
          default: ({ fieldProps, placeholder }: any) => {
            const [s, t] = placeholder ?? []
            return (
              <NTransfer
                {...$attrs}
                {...fieldProps}
                {...transferProps}
                options={options}
                sourceFilterPlaceholder={s}
                targetFilterPlaceholder={t}
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
