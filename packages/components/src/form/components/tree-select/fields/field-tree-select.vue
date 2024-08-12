<script setup lang='tsx'>
import type { TreeSelectInst, TreeSelectProps } from 'naive-ui'
import { NTreeSelect, treeSelectProps } from 'naive-ui'
import { get, isArray, isUndefined } from 'lodash-es'
import { eachTree, useInjectFieldContext } from 'pro-components-hooks'
import type { ProTreeSelectSlots } from '../slots'
import type { ProTreeSelectInst } from '../inst'
import { useReadonlyHelpers } from '../../field'
import { useExpandKeys } from './composables/useExpandKeys'
import { useIndeterminateKeys } from './composables/useIndeterminateKeys'
import { levelKey, useOptions } from './composables/useOptions'

defineOptions({
  name: 'ProFieldTreeSelect',
  inheritAttrs: false,
})
const props = defineProps(treeSelectProps)
defineSlots<ProTreeSelectSlots>()

const instRef = ref<TreeSelectInst>()
const field = useInjectFieldContext()!

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
    options = [],
    keyField = 'key',
    labelField = 'label',
    childrenField = 'children',
  } = props

  const labels: string[] = []
  const selectedValue = isArray(value.value) ? value.value : [value.value]
  eachTree(
    options,
    (item) => {
      const key = get(item, keyField)
      const label = get(item, labelField)
      if (label && selectedValue.includes(key)) {
        labels.push(label as string)
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

const exposed: ProTreeSelectInst = {
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
}

defineExpose(exposed)
</script>

<template>
  <slot
    v-if="readonly"
    name="readonly"
    v-bind="$props"
  >
    <template v-if="empty">
      {{ emptyText }}
    </template>
    <template v-else>
      {{ selectedLabels.join('，') }}
    </template>
  </slot>
  <NTreeSelect v-else ref="instRef" v-bind="{ ...nTreeSelectProps, ...$attrs }">
    <template v-for="(_, name) in $slots" :key="name" #[name]="data">
      <slot :name="name" v-bind="data ?? {}" />
    </template>
  </NTreeSelect>
</template>
