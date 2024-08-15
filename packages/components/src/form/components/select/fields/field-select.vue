<script setup lang='tsx'>
import { NEl, NFlex, NSelect, selectProps } from 'naive-ui'
import { eachTree } from 'pro-components-hooks'
import { get, isArray, isFunction, noop } from 'lodash-es'
import type { VNodeChild } from 'vue'
import type { ProSelectSlots } from '../slots'
import { useProSelectInst } from '../inst'
import { useReadonlyHelpers } from '../../field'

defineOptions({
  name: 'ProFieldSelect',
  inheritAttrs: false,
})
const props = defineProps(selectProps)
defineSlots<ProSelectSlots>()

const [
  instRef,
  methods,
] = useProSelectInst()

const {
  empty,
  value,
  readonly,
  emptyText,
} = useReadonlyHelpers()

const selectedLabels = computed(() => {
  const {
    renderTag,
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
        if (renderTag) {
          label = renderTag({ option: item as any, handleClose: noop })
        }
        if (renderLabel) {
          label = renderLabel(item as any, true)
        }
        if (isFunction(label)) {
          label = label(item, true)
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
  <NSelect v-else ref="instRef" v-bind="{ ...$props, ...$attrs }">
    <template v-for="(_, name) in $slots" :key="name" #[name]="data">
      <slot :name="name" v-bind="data ?? {}" />
    </template>
  </NSelect>
</template>
