<script setup lang="tsx">
import { ProField, ValueTypeEnum } from '../field'
import { proTreeSelectProps } from './props'
import type { ProTreeSelectSlots } from './slots'
import { useProTreeSelectInst } from './inst'

defineOptions({
  name: 'ProTreeSelect',
})
defineProps(proTreeSelectProps)
defineSlots<ProTreeSelectSlots>()

const [
  instRef,
  methods,
] = useProTreeSelectInst()

defineExpose(methods)
</script>

<template>
  <ProField
    ref="instRef"
    v-bind="$props"
    :default-value="null"
    :value-type="ValueTypeEnum.TREE_SELECT"
  >
    <template v-for="(_, name) in $slots" :key="name" #[name]="data">
      <slot :name="name" v-bind="data ?? {}" />
    </template>
  </ProField>
</template>
