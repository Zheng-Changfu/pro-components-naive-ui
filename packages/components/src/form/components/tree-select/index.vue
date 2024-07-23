<script lang="tsx">
import type { SlotsType } from 'vue'
import { computed, defineComponent, ref } from 'vue'
import type { TreeSelectInst, TreeSelectProps } from 'naive-ui'
import { NTreeSelect } from 'naive-ui'
import { get, isUndefined } from 'lodash-es'
import { resolveField, useField, useParseFieldProps } from '../../field'
import { ProFormItem } from '../../form-item'
import { proTreeSelectProps } from './props'
import type { ProTreeSelectSlots } from './slots'
import type { ProTreeSelectInstance } from './inst'
import { useOptions } from './useOptions'
import { useExpandKeys } from './useExpandKeys'
import { LevelKey } from './key'
import { useIndeterminateKeys } from './useIndeterminateKeys'

export default defineComponent({
  name: 'ProTreeSelect',
  props: proTreeSelectProps,
  slots: Object as SlotsType<ProTreeSelectSlots>,
  setup(props, { expose }) {
    const nTreeSelectInstRef = ref<TreeSelectInst>()

    const field = useField(
      'ProTreeSelect',
      props,
      { defaultValue: null },
    )

    const parsedProps = useParseFieldProps(
      props,
      field,
    )

    const {
      options,
      loading,
      controls,
      keyToTreeSelectNodeMap,
      onLoad,
      setOptions,
    } = useOptions(props, parsedProps, field)

    const {
      expandedKeys,
      getExpandedKeys,
      setExpandedKeys,
      doUpdateExpandedKeys,
    } = useExpandKeys(parsedProps, { keyToTreeSelectNodeMap })

    const {
      indeterminateKeys,
      getIndeterminateKeys,
      setIndeterminateKeys,
      doUpdateIndeterminateKeys,
    } = useIndeterminateKeys(parsedProps, { keyToTreeSelectNodeMap })

    const nTreeSelectProps = computed<TreeSelectProps>(() => {
      const { value, doUpdateValue } = field
      const {
        remote,
        leafField,
        onLoad: propOnLoad,
        expandAllOnFetchSuccess,
        filterEmptyChildrenField,
        ...rest
      } = parsedProps.value
      const loadFn = (remote || propOnLoad) ? onLoad : undefined
      return {
        ...rest as any,
        'defaultValue': undefined,
        'defaultExpandAll': undefined,
        'defaultExpandedKeys': undefined,
        'onUpdate:expandedKeys': undefined,
        'onUpdate:indeterminateKeys': undefined,
        'ref': nTreeSelectInstRef,
        'value': value.value,
        'loading': loading.value,
        'options': options.value,
        'expandedKeys': expandedKeys.value,
        'indeterminateKeys': indeterminateKeys.value,
        'onLoad': loadFn,
        'onUpdateValue': doUpdateValue,
        'onUpdateExpandedKeys': doUpdateExpandedKeys,
        'onUpdateIndeterminateKeys': doUpdateIndeterminateKeys,
      }
    })

    controls.onSuccess(() => {
      const { expandAllOnFetchSuccess } = parsedProps.value
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
      const disabledField = parsedProps.value.disabledField ?? 'disabled'

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
      const { multiple } = parsedProps.value
      const map = keyToTreeSelectNodeMap.value
      const allKeys = [...map.keys()]
      if (keys) {
        keys = keys.filter(k => map.get(k))
      }
      const checkedKeys = keys ?? allKeys
      const shouldCheckedKeys = multiple ? checkedKeys : checkedKeys[0]
      if (!isUndefined(shouldCheckedKeys)) {
        field.value.value = shouldCheckedKeys
      }
    }

    const exposed: ProTreeSelectInstance = {
      setOptions,
      getFullKeys,
      getLevelKeys,
      getEnabledKeys,
      setCheckedKeys,
      getExpandedKeys,
      setExpandedKeys,
      getIndeterminateKeys,
      setIndeterminateKeys,
      getOptions: () => options.value,
      getFetchControls: () => controls,
      blur: () => nTreeSelectInstRef.value?.blur(),
      getCheckedKeys: () => field.value.value ?? [],
      focus: () => nTreeSelectInstRef.value?.focus(),
      blurInput: () => nTreeSelectInstRef.value?.blurInput(),
      focusInput: () => nTreeSelectInstRef.value?.focusInput(),
      getCheckedData: () => nTreeSelectInstRef.value!.getCheckedData(),
      getIndeterminateData: () => nTreeSelectInstRef.value!.getIndeterminateData(),
    }

    expose(exposed)
    return {
      nTreeSelectProps,
    }
  },
  render() {
    const {
      $slots,
      $props,
    } = this

    return (
      <ProFormItem
        {...$props}
        v-slots={{
          default: () => {
            return resolveField(
              $props.fieldRender,
              {
                bindSlots: $slots,
                bindProps: this.nTreeSelectProps,
              },
              () => (
                <NTreeSelect
                  {...this.nTreeSelectProps}
                  v-slots={$slots}
                />
              ),
            )
          },
        }}
      >
      </ProFormItem>
    )
  },
})
</script>
