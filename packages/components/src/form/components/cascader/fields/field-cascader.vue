<script setup lang='tsx'>
import { NCascader, cascaderProps } from 'naive-ui'
import { get, isArray } from 'lodash-es'
import { eachTree } from 'pro-components-hooks'
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
    options = [],
    labelField = 'label',
    valueField = 'value',
    childrenField = 'children',
  } = props

  const labels: string[] = []
  const selectedValue = isArray(value.value) ? value.value : [value.value]
  eachTree(
    options,
    (item) => {
      const label = get(item, labelField)
      const value = get(item, valueField)
      if (label && selectedValue.includes(value)) {
        labels.push(label as string)
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
      {{ selectedLabels.join('，') }}
    </template>
  </slot>
  <NCascader v-else ref="instRef" v-bind="{ ...$props, ...$attrs }">
    <template v-for="(_, name) in $slots" :key="name" #[name]="data">
      <slot :name="name" v-bind="data ?? {}" />
    </template>
  </NCascader>
</template>
