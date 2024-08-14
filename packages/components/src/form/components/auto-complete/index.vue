<script setup lang='tsx'>
import { ProField, ValueTypeEnum } from '../field'
import { useProAutoCompleteInst } from './inst'
import { proAutoCompleteProps } from './props'
import type { ProAutoCompleteSlots } from './slots'

defineOptions({
  name: 'ProAutoComplete',
})
defineProps(proAutoCompleteProps)
defineSlots<ProAutoCompleteSlots>()

const [
  instRef,
  methods,
] = useProAutoCompleteInst()

defineExpose(methods)
</script>

<template>
  <ProField
    ref="instRef"
    v-bind="$props"
    :default-value="null"
    :value-type="ValueTypeEnum.AUTO_COMPLETE"
  >
    <template v-for="(_, name) in $slots" :key="name" #[name]="data">
      <slot :name="name" v-bind="data ?? {}" />
    </template>
  </ProField>
</template>
