import type { TreeSelectInst, TreeSelectProps } from 'naive-ui'
import type { SlotsType, VNodeChild } from 'vue'
import type { ProTreeSelectSlots } from '../slots'
import { get, isArray, isUndefined, noop } from 'lodash-es'
import { NFlex, NTreeSelect, treeSelectProps } from 'naive-ui'
import { eachTree, useInjectField } from 'pro-composables'
import { computed, defineComponent, ref } from 'vue'
import { useReadonlyHelpers } from '../../field'
import { useInjectTreeSelectInstStore } from '../inst'
import { useExpandKeys } from './composables/useExpandKeys'
import { useIndeterminateKeys } from './composables/useIndeterminateKeys'
import { levelKey, useOptions } from './composables/useOptions'

export default defineComponent({
  name: 'TreeSelect',
  props: treeSelectProps,
  slots: Object as SlotsType<ProTreeSelectSlots>,
  inheritAttrs: false,
  setup(props) {
    const field = useInjectField()!
    const instRef = ref<TreeSelectInst>()

    const {
      registerInst,
    } = useInjectTreeSelectInstStore()!

    const {
      empty,
      value,
      readonly,
      emptyText,
    } = useReadonlyHelpers()

    const {
      options,
      keyToNodeMap,
    } = useOptions(props)

    const {
      expandedKeys,
      getExpandedKeys,
      setExpandedKeys,
      doUpdateExpandedKeys,
    } = useExpandKeys(props, { keyToNodeMap })

    const {
      indeterminateKeys,
      getIndeterminateKeys,
      setIndeterminateKeys,
      doUpdateIndeterminateKeys,
    } = useIndeterminateKeys(props, { keyToNodeMap })

    const nTreeSelectProps = computed<TreeSelectProps>(() => {
      return {
        ...props,
        options: options.value,
        expandedKeys: expandedKeys.value,
        indeterminateKeys: indeterminateKeys.value,
        onUpdateExpandedKeys: doUpdateExpandedKeys,
        onUpdateIndeterminateKeys: doUpdateIndeterminateKeys,
      }
    })

    const selectedLabels = computed(() => {
      const {
        renderTag,
        renderLabel,
        options = [],
        keyField = 'key',
        labelField = 'label',
        childrenField = 'children',
      } = props

      const labels: VNodeChild[] = []
      const selectedValue = isArray(value.value) ? value.value : [value.value]
      eachTree(
        options,
        (item) => {
          const value = get(item, keyField)
          if (selectedValue.includes(value)) {
            let label = get(item, labelField) as VNodeChild
            if (renderTag) {
              label = renderTag({ option: item as any, handleClose: noop })
            }
            if (renderLabel) {
              label = renderLabel({ option: item, checked: true, selected: true })
            }
            if (label) {
              labels.push(<span>{label}</span>)
            }
          }
        },
        childrenField,
      )
      return labels
    })

    function getFullKeys() {
      return [...keyToNodeMap.value.keys()]
    }

    function getLevelKeys(level: number, getLtLevelKey = true) {
      if (level <= 0) {
        return []
      }
      const keys: Array<string | number> = []
      const map = keyToNodeMap.value
      map.forEach((value, key) => {
        const nodeLevel = value[levelKey as any]
        if (nodeLevel === level) {
          keys.push(key)
        }
        if (getLtLevelKey && nodeLevel < level) {
          keys.push(key)
        }
      })
      return keys
    }

    function getEnabledKeys() {
      const keys: Array<string | number> = []
      const map = keyToNodeMap.value
      const disabledField = props.disabledField ?? 'disabled'
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
      const { multiple } = props
      const map = keyToNodeMap.value
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

    registerInst({
      getFullKeys,
      getLevelKeys,
      getEnabledKeys,
      setCheckedKeys,
      getExpandedKeys,
      setExpandedKeys,
      getIndeterminateKeys,
      setIndeterminateKeys,
      blur: () => instRef.value?.blur(),
      focus: () => instRef.value?.focus(),
      blurInput: () => instRef.value?.blurInput(),
      getCheckedKeys: () => field.value.value ?? [],
      focusInput: () => instRef.value?.focusInput(),
      getCheckedData: () => instRef.value!.getCheckedData(),
      getIndeterminateData: () => instRef.value!.getIndeterminateData(),
    })
    return {
      empty,
      instRef,
      readonly,
      emptyText,
      selectedLabels,
      nTreeSelectProps,
    }
  },
  render() {
    if (this.readonly) {
      const { empty, emptyText, selectedLabels } = this

      if (this.$slots.readonly) {
        return this.$slots.readonly(this.$props)
      }
      if (empty) {
        return emptyText
      }
      return (
        <NFlex size={[8, 0]}>
          {selectedLabels}
        </NFlex>
      )
    }
    return (
      <NTreeSelect
        ref="instRef"
        {...this.$attrs}
        {...this.nTreeSelectProps}
        v-slots={this.$slots}
      />
    )
  },
})
