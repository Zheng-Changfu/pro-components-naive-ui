<script setup lang='tsx'>
import { NFlex, NInputNumber, inputNumberProps } from 'naive-ui'
import type { ProDigitSlots } from '../slots'
import { useProDigitInst } from '../inst'
import { useReadonlyHelpers } from '../../field'

defineOptions({
  name: 'ProFieldDigit',
})
defineProps(inputNumberProps)
defineSlots<ProDigitSlots>()

const [
  instRef,
  methods,
] = useProDigitInst()

const {
  empty,
  value,
  readonly,
  emptyText,
} = useReadonlyHelpers()

defineExpose(methods)
</script>

<template>
  <slot v-if="readonly" name="readonly" v-bind="$props">
    <template v-if="empty">
      {{ emptyText }}
    </template>
    <template v-else>
      <NFlex :size="[8, 0]">
        <NEL><slot name="prefix" /></NEL>
        <NEL>{{ value }}</NEL>
        <NEL><slot name="suffix" /></NEL>
      </NFlex>
    </template>
  </slot>
  <NInputNumber
    v-else
    ref="instRef"
    v-bind="$props"
  >
    <template v-for="(_, name) in $slots" :key="name" #[name]="data">
      <slot :name="name" v-bind="data ?? {}" />
    </template>
  </NInputNumber>
</template>
