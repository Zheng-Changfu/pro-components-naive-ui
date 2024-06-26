<script lang="tsx">
import type { SlotsType } from 'vue'
import { computed, defineComponent, ref, toRef } from 'vue'
import type { SelectInst, SelectProps } from 'naive-ui'
import { NSelect } from 'naive-ui'
import { createField, useCompile } from 'pro-components-hooks'
import { isArray } from 'lodash-es'
import { useOmitSlots } from '../hooks/useOmitSlots'
import type { ProComponentConfig } from '../form'
import { ProComponentConfigKey, ProFormItem, useGetProFieldProps } from '../form'
import { proSelectProps } from './props'
import type { ProSelectSlots } from './slots'
import { proSelectExtendSlotKeys } from './slots'
import type { ProSelectInstance } from './inst'
import { useOptions } from './useOptions'

export default defineComponent({
  name: 'ProSelect',
  props: proSelectProps,
  slots: Object as SlotsType<ProSelectSlots>,
  setup(props, { slots, expose }) {
    const selectInstRef = ref<SelectInst>()
    const selectSlots = useOmitSlots(slots, proSelectExtendSlotKeys)

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

    const {
      loading,
      options,
      controls,
      onSearch,
    } = useOptions(props, compiledFieldProps)

    field[ProComponentConfigKey] = {
      type: 'ProSelect',
      slots: computed(() => slots),
      fieldProps: compiledFieldProps,
      ruleType: ['string', 'number', 'array'],
      empty: computed(() => isArray(value.value)
        ? value.value.length <= 0
        : [null, undefined, ''].includes(value.value),
      ),
    } as Partial<ProComponentConfig>

    const selectProps = computed<SelectProps>(() => {
      return {
        ref: selectInstRef,
        value: value.value,
        loading: loading.value,
        options: options.value,
        onSearch,
        onUpdateValue: doUpdateValue,
      }
    })

    const exposed: ProSelectInstance = {
      getFetchControls: () => controls,
      blur: () => selectInstRef.value?.blur(),
      focus: () => selectInstRef.value?.focus(),
      blurInput: () => selectInstRef.value?.blurInput(),
      focusInput: () => selectInstRef.value?.focusInput(),
    }

    expose(exposed)
    return {
      stringPath,
      selectSlots,
      selectProps,
    }
  },
  render() {
    const {
      $props,
      $attrs,
      stringPath,
      selectSlots,
      selectProps,
    } = this

    return (
      <ProFormItem
        {...$props}
        path={stringPath}
        v-slots={{
          default: ({ fieldProps, placeholder }: any) => {
            return (
              <NSelect
                {...$attrs}
                {...fieldProps}
                {...selectProps}
                placeholder={placeholder}
                v-slots={selectSlots}
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
