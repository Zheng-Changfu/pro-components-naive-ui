<script lang="tsx">
import type { SlotsType } from 'vue'
import { computed, defineComponent, ref } from 'vue'
import type { TreeInst, TreeProps } from 'naive-ui'
import { NSpin, NTree } from 'naive-ui'
import { get } from 'lodash-es'
import { useOmitProps } from '../hooks'
import { proTreeExtendProps, proTreeProps } from './props'
import type { ProTreeSlots } from './slots'
import type { ProTreeInstance } from './inst'
import { useTreeData } from './useTreeData'
import { useExpandKeys } from './useExpandKeys'
import { useSelectKeys } from './useSelectKeys'
import { useCheckKeys } from './useCheckKeys'
import { LevelKey } from './key'
import { useIndeterminateKeys } from './useIndeterminateKeys'

export default defineComponent({
  name: 'ProTree',
  inheritAttrs: false,
  props: proTreeProps,
  slots: Object as SlotsType<ProTreeSlots>,
  setup(props, { expose }) {
    const treeInstRef = ref<TreeInst>()

    const treeProps = useOmitProps(
      props,
      proTreeExtendProps,
    )

    const {
      data,
      loading,
      controls,
      keyToTreeNodeMap,
      onLoad,
      setData,
    } = useTreeData(props)

    const {
      expandedKeys,
      getExpandedKeys,
      setExpandedKeys,
      doUpdateExpandedKeys,
    } = useExpandKeys(props, { keyToTreeNodeMap })

    const {
      selectedKeys,
      getSelectedKeys,
      setSelectedKeys,
      doUpdateSelectedKeys,
    } = useSelectKeys(props, { keyToTreeNodeMap })

    const {
      checkedKeys,
      getCheckedKeys,
      setCheckedKeys,
      doUpdateCheckedKeys,
    } = useCheckKeys(props, { keyToTreeNodeMap })

    const {
      indeterminateKeys,
      getIndeterminateKeys,
      setIndeterminateKeys,
      doUpdateIndeterminateKeys,
    } = useIndeterminateKeys(props, { keyToTreeNodeMap })

    const nTreeProps = computed<TreeProps>(() => {
      const { remote, onLoad: propOnLoad } = props
      const loadFn = (remote || propOnLoad) ? onLoad : undefined
      return {
        ...treeProps.value,
        'onUpdate:checkedKeys': undefined,
        'onUpdate:expandedKeys': undefined,
        'onUpdate:selectedKeys': undefined,
        'onUpdate:indeterminateKeys': undefined,

        'ref': treeInstRef,
        'data': data.value,
        'loading': loading.value,
        'checkedKeys': checkedKeys.value,
        'expandedKeys': expandedKeys.value,
        'selectedKeys': selectedKeys.value,
        'indeterminateKeys': indeterminateKeys.value,
        'onUpdateCheckedKeys': doUpdateCheckedKeys,
        'onUpdateExpandedKeys': doUpdateExpandedKeys,
        'onUpdateSelectedKeys': doUpdateSelectedKeys,
        'onUpdateIndeterminateKeys': doUpdateIndeterminateKeys,
        'onLoad': loadFn,
      }
    })

    controls.onSuccess(() => {
      const { expandAllOnFetchSuccess } = props
      expandAllOnFetchSuccess && setExpandedKeys()
    })

    function getFullKeys() {
      return [...keyToTreeNodeMap.value.keys()]
    }

    function getLevelKeys(level: number, needLtLevelKey = true) {
      if (level <= 0) {
        return []
      }
      const keys: Array<string | number> = []
      const map = keyToTreeNodeMap.value
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
      const map = keyToTreeNodeMap.value
      const disabledField = props.disabledField ?? 'disabled'

      const isEnabledNode = (node: Record<string, any>) => {
        return !get(node, disabledField) && !node.checkboxDisabled
      }

      map.forEach((value, key) => {
        if (isEnabledNode(value)) {
          keys.push(key)
        }
      })
      return keys
    }

    const exposed: ProTreeInstance = {
      getFullKeys,
      getLevelKeys,
      getEnabledKeys,
      setCheckedKeys,
      getCheckedKeys,
      getSelectedKeys,
      getExpandedKeys,
      setExpandedKeys,
      setSelectedKeys,
      getIndeterminateKeys,
      setIndeterminateKeys,
      setTreeData: setData,
      getTreeData: () => data.value,
      getFetchControls: () => controls,
      getCheckedData: () => treeInstRef.value!.getCheckedData(),
      getIndeterminateData: () => treeInstRef.value!.getIndeterminateData(),
      scrollTo: (...args: any[]) => ((treeInstRef.value?.scrollTo) as any)(...args),
    }

    expose(exposed)
    return {
      loading,
      nTreeProps,
    }
  },
  render() {
    const {
      $props,
      $attrs,
      $slots,
      loading,
      nTreeProps,
    } = this

    return (
      <NSpin
        show={loading}
        style={{ width: '100%' }}
        {...$props.spinProps}
        v-slots={{
          default: () => (
            <NTree
              {...$attrs}
              {...nTreeProps}
              v-slots={$slots}
            />
          ),
        }}
      />

    )
  },
})
</script>
