<script lang="tsx">
import type { SlotsType } from 'vue'
import { computed, defineComponent, ref, toRef } from 'vue'
import type { TreeSelectInst, TreeSelectProps } from 'naive-ui'
import { NTreeSelect } from 'naive-ui'
import { createField, useCompile } from 'pro-components-hooks'
import { isArray } from 'lodash-es'
import { useOmitSlots } from '../hooks/useOmitSlots'
import type { ProComponentConfig } from '../form'
import { ProComponentConfigKey, ProFormItem, useGetProFieldProps } from '../form'
import { proTreeSelectProps } from './props'
import type { ProTreeSelectSlots } from './slots'
import { proTreeSelectExtendSlotKeys } from './slots'
import type { ProTreeSelectInstance } from './inst'
import { useOptions } from './useOptions'

export default defineComponent({
  name: 'ProTreeSelect',
  props: proTreeSelectProps,
  slots: Object as SlotsType<ProTreeSelectSlots>,
  setup(props, { slots, expose }) {
    const treeSelectInstRef = ref<TreeSelectInst>()
    const treeSelectSlots = useOmitSlots(
      slots,
      proTreeSelectExtendSlotKeys,
    )

    const proFieldProps = useGetProFieldProps(props)
    const field = createField({ ...proFieldProps, defaultValue: null })

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

    const { options } = useOptions(
      props,
      compiledFieldProps,
    )

    field[ProComponentConfigKey] = {
      type: 'ProTreeSelect',
      slots: computed(() => slots),
      ruleType: ['string', 'number', 'array'],
      empty: computed(() => isArray(value.value)
        ? value.value.length <= 0
        : [null, undefined, ''].includes(value.value),
      ),
    } as Partial<ProComponentConfig>

    const treeSelectProps = computed<TreeSelectProps>(() => {
      return {
        ref: treeSelectInstRef,
        value: value.value,
        onUpdateValue: doUpdateValue,
      }
    })

    const exposed: ProTreeSelectInstance = {
      blur: () => treeSelectInstRef.value?.blur(),
      focus: () => treeSelectInstRef.value?.focus(),
      blurInput: () => treeSelectInstRef.value?.blurInput(),
      focusInput: () => treeSelectInstRef.value?.focusInput(),
      getCheckedData: () => treeSelectInstRef.value!.getCheckedData(),
      getIndeterminateData: () => treeSelectInstRef.value!.getIndeterminateData(),
    }

    expose(exposed)
    return {
      options,
      stringPath,
      treeSelectSlots,
      treeSelectProps,
    }
  },
  render() {
    const {
      $props,
      $attrs,
      options,
      stringPath,
      treeSelectSlots,
      treeSelectProps,
    } = this

    return (
      <ProFormItem
        {...$props}
        path={stringPath}
        v-slots={{
          default: ({ fieldProps, placeholder }: any) => {
            return (
              <NTreeSelect
                {...$attrs}
                {...fieldProps}
                {...treeSelectProps}
                options={options}
                placeholder={placeholder}
                v-slots={treeSelectSlots}
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
