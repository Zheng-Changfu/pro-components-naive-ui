<script setup lang='tsx'>
import { NEl, NFlex, NInput, inputProps } from 'naive-ui'
import type { ProInputSlots } from '../slots'
import { useProInputInst } from '../inst'
import { useReadonlyHelpers } from '../../field'

defineOptions({
  name: 'ProFieldInput',
})
defineProps(inputProps)
defineSlots<ProInputSlots>()

const [
  instRef,
  methods,
] = useProInputInst()

const {
  empty,
  value,
  readonly,
  emptyText,
} = useReadonlyHelpers()

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
        <NEl><slot name="prefix" /></NEl>
        <NEl>{{ value }}</NEl>
        <NEl><slot name="suffix" /></NEl>
      </NFlex>
    </template>
  </slot>
  <NInput
    v-else
    ref="instRef"
    v-bind="$props"
  >
    <template v-for="(_, name) in $slots" :key="name" #[name]="data">
      <slot :name="name" v-bind="data ?? {}" />
    </template>
  </NInput>
</template>
