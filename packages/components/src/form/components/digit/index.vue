<script setup lang='tsx'>
import { ProField, ValueTypeEnum } from '../field'
import { proDigitProps } from './props'
import type { ProDigitSlots } from './slots'
import { useProDigitInst } from './inst'

defineOptions({
  name: 'ProDigit',
})
defineProps(proDigitProps)
defineSlots<ProDigitSlots>()

const [
  instRef,
  methods,
] = useProDigitInst()

defineExpose(methods)
</script>

<template>
  <ProField
    ref="instRef"
    v-bind="$props"
    :default-value="null"
    :value-type="ValueTypeEnum.DIGIT"
  >
    <template v-for="(_, name) in $slots" :key="name" #[name]="data">
      <slot :name="name" v-bind="data ?? {}" />
    </template>
  </ProField>
</template>
