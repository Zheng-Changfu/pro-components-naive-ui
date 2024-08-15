<script setup lang='tsx'>
import { NCascader, NEl, NFlex, cascaderProps } from 'naive-ui'
import { get, isArray } from 'lodash-es'
import { eachTree } from 'pro-components-hooks'
import type { VNodeChild } from 'vue'
import type { ProCascaderSlots } from '../slots'
import { useProCascaderInst } from '../inst'
import { useReadonlyHelpers } from '../../field'

defineOptions({
  name: 'ProFieldCascader',
  inheritAttrs: false,
})
const props = defineProps(cascaderProps)
defineSlots<ProCascaderSlots>()

const [
  instRef,
  methods,
] = useProCascaderInst()

const {
  empty,
  value,
  readonly,
  emptyText,
} = useReadonlyHelpers()

const selectedLabels = computed(() => {
  const {
    renderLabel,
    options = [],
    labelField = 'label',
    valueField = 'value',
    childrenField = 'children',
  } = props
  const labels: VNodeChild[] = []
  const selectedValue = isArray(value.value) ? value.value : [value.value]
  eachTree(
    options,
    (item) => {
      const value = get(item, valueField)
      if (selectedValue.includes(value)) {
        let label = get(item, labelField) as VNodeChild
        if (renderLabel) {
          label = renderLabel(item as any, true)
        }
        if (label) {
          labels.push(<NEl>{label}</NEl>)
        }
      }
    },
    childrenField,
  )

  return labels
})

defineExpose(methods)
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
      <NFlex :size="[8, 0]">
        <component :is="() => selectedLabels" />
      </NFlex>
    </template>
  </slot>
  <NCascader v-else ref="instRef" v-bind="{ ...$props, ...$attrs }">
    <template v-for="(_, name) in $slots" :key="name" #[name]="data">
      <slot :name="name" v-bind="data ?? {}" />
    </template>
  </NCascader>
</template>
