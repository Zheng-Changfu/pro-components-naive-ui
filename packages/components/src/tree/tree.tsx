import type { TreeInst, TreeProps } from 'naive-ui'
import type { SlotsType } from 'vue'
import type { ProTreeInst } from './inst'
import type { ProTreeSlots } from './slots'
import { get } from 'lodash-es'
import { NTree } from 'naive-ui'
import { computed, ref } from 'vue'
import { useOverrideProps } from '../composables'
import { useCheckKeys } from './composables/useCheckKeys'
import { useExpandKeys } from './composables/useExpandKeys'
import { useIndeterminateKeys } from './composables/useIndeterminateKeys'
import { useSelectKeys } from './composables/useSelectKeys'
import { levelKey, useTreeData } from './composables/useTreeData'
import { proTreeProps } from './props'

const name = 'ProTree'
export default defineComponent({
  name,
  props: proTreeProps,
  slots: Object as SlotsType<ProTreeSlots>,
  setup(props, { expose }) {
    const treeInstRef = ref<TreeInst>()

    const overridedProps = useOverrideProps(
      name,
      props,
    )

    const {
      data,
      setData,
      keyToNodeMap,
    } = useTreeData(overridedProps)

    const {
      expandedKeys,
      getExpandedKeys,
      setExpandedKeys,
      doUpdateExpandedKeys,
    } = useExpandKeys(overridedProps, { keyToNodeMap })

    const {
      selectedKeys,
      getSelectedKeys,
      setSelectedKeys,
      doUpdateSelectedKeys,
    } = useSelectKeys(overridedProps, { keyToNodeMap })

    const {
      checkedKeys,
      getCheckedKeys,
      setCheckedKeys,
      doUpdateCheckedKeys,
    } = useCheckKeys(overridedProps, { keyToNodeMap })

    const {
      indeterminateKeys,
      getIndeterminateKeys,
      setIndeterminateKeys,
      doUpdateIndeterminateKeys,
    } = useIndeterminateKeys(overridedProps, { keyToNodeMap })

    const nTreeProps = computed<TreeProps>(() => {
      return {
        ...overridedProps.value,
        'data': data.value,
        'checkedKeys': checkedKeys.value,
        'expandedKeys': expandedKeys.value,
        'selectedKeys': selectedKeys.value,
        'indeterminateKeys': indeterminateKeys.value,
        'onUpdateCheckedKeys': doUpdateCheckedKeys,
        'onUpdateExpandedKeys': doUpdateExpandedKeys,
        'onUpdateSelectedKeys': doUpdateSelectedKeys,
        'onUpdateIndeterminateKeys': doUpdateIndeterminateKeys,
        'onUpdate:checkedKeys': undefined,
        'onUpdate:expandedKeys': undefined,
        'onUpdate:selectedKeys': undefined,
        'onUpdate:indeterminateKeys': undefined,
      }
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
      const disabledField = overridedProps.value.disabledField ?? 'disabled'

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

    const exposed: ProTreeInst = {
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
      getCheckedData: () => treeInstRef.value!.getCheckedData(),
      getIndeterminateData: () => treeInstRef.value!.getIndeterminateData(),
      scrollTo: (...args: any[]) => ((treeInstRef.value?.scrollTo) as any)(...args),
    }

    expose(exposed)
    return {
      nTreeProps,
      treeInstRef,
    }
  },
  render() {
    return (
      <NTree
        ref="treeInstRef"
        {...this.nTreeProps}
        v-slots={this.$slots}
      />
    )
  },
})
