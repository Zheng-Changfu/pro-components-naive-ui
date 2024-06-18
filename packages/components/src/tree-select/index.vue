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

    const {
      options,
      loading,
      controls,
      onLoad,
    } = useOptions(props, compiledFieldProps)

    field[ProComponentConfigKey] = {
      type: 'ProTreeSelect',
      ruleType: ['string', 'number', 'array'],
      fieldProps: compiledFieldProps,
      slots: computed(() => slots),
      empty: computed(() => isArray(value.value)
        ? value.value.length <= 0
        : [null, undefined, ''].includes(value.value),
      ),
    } as Partial<ProComponentConfig>

    const treeSelectProps = computed<TreeSelectProps>(() => {
      const { remote, onLoad: userOnLoad } = compiledFieldProps.value ?? {}
      const loadFn = (remote || userOnLoad) ? onLoad : undefined
      return {
        ref: treeSelectInstRef,
        value: value.value,
        loading: loading.value,
        options: options.value,
        onLoad: loadFn,
        onUpdateValue: doUpdateValue,
      }
    })

    const exposed: ProTreeSelectInstance = {
      getFetchControls: () => controls,
      blur: () => treeSelectInstRef.value?.blur(),
      focus: () => treeSelectInstRef.value?.focus(),
      blurInput: () => treeSelectInstRef.value?.blurInput(),
      focusInput: () => treeSelectInstRef.value?.focusInput(),
      getCheckedData: () => treeSelectInstRef.value!.getCheckedData(),
      getIndeterminateData: () => treeSelectInstRef.value!.getIndeterminateData(),
    }

    expose(exposed)
    return {
      stringPath,
      treeSelectSlots,
      treeSelectProps,
    }
  },
  render() {
    const {
      $props,
      $attrs,
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
            const {
              remote,
              filterEmptyChildrenField,
              emptyChildrenConsideredLeafNode,
              ...treeSelectFieldProps
            } = fieldProps

            return (
              <NTreeSelect
                {...$attrs}
                {...treeSelectFieldProps}
                {...treeSelectProps}
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
