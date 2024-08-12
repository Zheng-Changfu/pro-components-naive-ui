<script setup lang="tsx">
import { ProField, ValueTypeEnum } from '../field'
import { proSelectProps } from './props'
import type { ProSelectSlots } from './slots'
import { useProSelectInst } from './inst'

defineOptions({
  name: 'ProSelect',
})
defineProps(proSelectProps)
defineSlots<ProSelectSlots>()

const [
  instRef,
  methods,
] = useProSelectInst()

defineExpose(methods)
</script>

<template>
  <ProField
    ref="instRef"
    v-bind="$props"
    :default-value="null"
    :value-type="ValueTypeEnum.SELECT"
  >
    <template v-for="(_, name) in $slots" :key="name" #[name]="data">
      <slot :name="name" v-bind="data ?? {}" />
    </template>
  </ProField>
</template>
