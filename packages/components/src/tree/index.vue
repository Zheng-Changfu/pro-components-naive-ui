<script setup lang="tsx">
import { computed, ref } from 'vue'
import type { TreeInst, TreeProps } from 'naive-ui'
import { NTree } from 'naive-ui'
import { get } from 'lodash-es'
import { proTreeProps } from './props'
import type { ProTreeSlots } from './slots'
import type { ProTreeInst } from './inst'
import { levelKey, useTreeData } from './composables/useTreeData'
import { useExpandKeys } from './composables/useExpandKeys'
import { useSelectKeys } from './composables/useSelectKeys'
import { useCheckKeys } from './composables/useCheckKeys'
import { useIndeterminateKeys } from './composables/useIndeterminateKeys'

defineOptions({
  name: 'ProTree',
})
const props = defineProps(proTreeProps)
const slots = defineSlots<ProTreeSlots>()

const treeInstRef = ref<TreeInst>()

const {
  data,
  setData,
  keyToNodeMap,
} = useTreeData(props)

const {
  expandedKeys,
  getExpandedKeys,
  setExpandedKeys,
  doUpdateExpandedKeys,
} = useExpandKeys(props, { keyToNodeMap })

const {
  selectedKeys,
  getSelectedKeys,
  setSelectedKeys,
  doUpdateSelectedKeys,
} = useSelectKeys(props, { keyToNodeMap })

const {
  checkedKeys,
  getCheckedKeys,
  setCheckedKeys,
  doUpdateCheckedKeys,
} = useCheckKeys(props, { keyToNodeMap })

const {
  indeterminateKeys,
  getIndeterminateKeys,
  setIndeterminateKeys,
  doUpdateIndeterminateKeys,
} = useIndeterminateKeys(props, { keyToNodeMap })

const nTreeProps = computed<TreeProps>(() => {
  return {
    ...props,
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

defineExpose(exposed)
</script>

<template>
  <NTree ref="treeInstRef" v-bind="nTreeProps">
    <template v-for="(_, name) in slots" :key="name" #[name]="data">
      <slot :name="name" v-bind="data ?? {}" />
    </template>
  </NTree>
</template>
