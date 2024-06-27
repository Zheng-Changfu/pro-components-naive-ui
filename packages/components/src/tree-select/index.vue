<script lang="tsx">
import type { SlotsType } from 'vue'
import { computed, defineComponent, ref, toRef } from 'vue'
import type { TreeSelectInst, TreeSelectProps } from 'naive-ui'
import { NTreeSelect } from 'naive-ui'
import { createField, useCompile } from 'pro-components-hooks'
import { get, isArray, isUndefined } from 'lodash-es'
import { useOmitSlots } from '../hooks/useOmitSlots'
import type { ProComponentConfig } from '../form'
import { ProComponentConfigKey, ProFormItem, useGetProFieldProps } from '../form'
import { proTreeSelectProps } from './props'
import type { ProTreeSelectSlots } from './slots'
import { proTreeSelectExtendSlotKeys } from './slots'
import type { ProTreeSelectInstance } from './inst'
import { useOptions } from './useOptions'
import { useExpandKeys } from './useExpandKeys'
import { LevelKey } from './key'

export default defineComponent({
  name: 'ProTreeSelect',
  props: proTreeSelectProps,
  slots: Object as SlotsType<ProTreeSelectSlots>,
  setup(props, { slots, expose }) {
    const nTreeSelectInstRef = ref<TreeSelectInst>()
    const nTreeSelectSlots = useOmitSlots(
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
      keyToTreeSelectNodeMap,
      onLoad,
    } = useOptions(props, compiledFieldProps)

    const {
      expandedKeys,
      getExpandedKeys,
      setExpandedKeys,
      doUpdateExpandedKeys,
    } = useExpandKeys(compiledFieldProps, { keyToTreeSelectNodeMap })

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

    const nTreeSelectProps = computed<TreeSelectProps>(() => {
      const { remote } = props
      const { onLoad: userOnLoad } = compiledFieldProps.value ?? {}
      const loadFn = (remote || userOnLoad) ? onLoad : undefined
      return {
        'ref': nTreeSelectInstRef,
        'value': value.value,
        'loading': loading.value,
        'options': options.value,
        'expandedKeys': expandedKeys.value,
        'onUpdate:expandedKeys': undefined,
        'onLoad': loadFn,
        'onUpdateValue': doUpdateValue,
        'onUpdateExpandedKeys': doUpdateExpandedKeys,
      }
    })

    controls.onSuccess(() => {
      const { expandAllOnFetchSuccess } = props
      expandAllOnFetchSuccess && setExpandedKeys()
    })

    function getFullKeys() {
      return [...keyToTreeSelectNodeMap.value.keys()]
    }

    function getLevelKeys(level: number, needLtLevelKey = true) {
      if (level <= 0) {
        return []
      }
      const keys: Array<string | number> = []
      const map = keyToTreeSelectNodeMap.value
      map.forEach((value, key) => {
        const nodeLevel = value[LevelKey as any]
        if (nodeLevel === level) {
          keys.push(key)
        }
        if (needLtLevelKey && nodeLevel < level) {
          keys.push(key)
        }
      })
      return keys
    }

    function getEnabledKeys() {
      const keys: Array<string | number> = []
      const map = keyToTreeSelectNodeMap.value
      const disabledField = compiledFieldProps.value?.disabledField ?? 'disabled'

      const isEnabledNode = (node: Record<string, any>) => {
        return !get(node, disabledField)
      }

      map.forEach((value, key) => {
        if (isEnabledNode(value)) {
          keys.push(key)
        }
      })
      return keys
    }

    function setCheckedKeys(keys?: Array<string | number>) {
      const { multiple } = compiledFieldProps.value ?? {}
      const map = keyToTreeSelectNodeMap.value
      const allKeys = [...map.keys()]
      if (keys) {
        keys = keys.filter(k => map.get(k))
      }
      const checkedKeys = keys ?? allKeys
      const shouldCheckedKeys = multiple ? checkedKeys : checkedKeys[0]
      if (!isUndefined(shouldCheckedKeys)) {
        value.value = shouldCheckedKeys
      }
    }

    const exposed: ProTreeSelectInstance = {
      getFullKeys,
      getLevelKeys,
      getEnabledKeys,
      setCheckedKeys,
      getExpandedKeys,
      setExpandedKeys,
      getOptions: () => options.value,
      getFetchControls: () => controls,
      getCheckedKeys: () => value.value ?? [],
      blur: () => nTreeSelectInstRef.value?.blur(),
      focus: () => nTreeSelectInstRef.value?.focus(),
      blurInput: () => nTreeSelectInstRef.value?.blurInput(),
      focusInput: () => nTreeSelectInstRef.value?.focusInput(),
      getCheckedData: () => nTreeSelectInstRef.value!.getCheckedData(),
      getIndeterminateData: () => nTreeSelectInstRef.value!.getIndeterminateData(),
    }

    expose(exposed)
    return {
      stringPath,
      nTreeSelectSlots,
      nTreeSelectProps,
    }
  },
  render() {
    const {
      $props,
      $attrs,
      stringPath,
      nTreeSelectSlots,
      nTreeSelectProps,
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
                {...nTreeSelectProps}
                placeholder={placeholder}
                v-slots={nTreeSelectSlots}
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
