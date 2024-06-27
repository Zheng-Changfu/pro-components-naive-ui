<script lang="tsx">
import type { SlotsType } from 'vue'
import { computed, defineComponent, ref } from 'vue'
import type { CheckboxInst, CheckboxProps } from 'naive-ui'
import { NCheckbox } from 'naive-ui'
import { createField } from 'pro-components-hooks'
import { useOmitSlots } from '../hooks/useOmitSlots'
import type { ProComponentConfig } from '../form'
import { ProComponentConfigKey, ProFormItem, useGetProFieldProps } from '../form'
import { proCheckboxProps } from './props'
import type { ProCheckboxSlots } from './slots'
import { proCheckboxExtendSlotKeys } from './slots'
import type { ProCheckboxInstance } from './inst'

export default defineComponent({
  name: 'ProCheckbox',
  props: proCheckboxProps,
  slots: Object as SlotsType<ProCheckboxSlots>,
  setup(props, { slots, expose }) {
    const nCheckboxInst = ref<CheckboxInst>()
    const nCheckboxSlots = useOmitSlots(
      slots,
      proCheckboxExtendSlotKeys,
    )
    const proFieldProps = useGetProFieldProps(props)
    const field = createField({ ...proFieldProps, defaultValue: false })

    const {
      value,
      stringPath,
      doUpdateValue,
    } = field

    field[ProComponentConfigKey] = {
      ruleType: 'boolean',
      type: 'ProCheckbox',
      slots: computed(() => slots),
      empty: computed(() => [null, undefined].includes(value.value)),
    } as Partial<ProComponentConfig>

    const nCheckboxProps = computed<CheckboxProps>(() => {
      return {
        ref: nCheckboxInst,
        checked: value.value,
        onUpdateChecked: doUpdateValue,
      }
    })

    const exposed: ProCheckboxInstance = {
      blur: () => nCheckboxInst.value?.blur(),
      focus: () => nCheckboxInst.value?.focus(),
    }

    expose(exposed)
    return {
      stringPath,
      nCheckboxSlots,
      nCheckboxProps,
    }
  },
  render() {
    const {
      $props,
      $attrs,
      stringPath,
      nCheckboxSlots,
      nCheckboxProps,
    } = this

    return (
      <ProFormItem
        {...$props}
        path={stringPath}
        v-slots={{
          default: ({ fieldProps }: any) => {
            return (
              <NCheckbox
                {...$attrs}
                {...fieldProps}
                {...nCheckboxProps}
                v-slots={nCheckboxSlots}
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
