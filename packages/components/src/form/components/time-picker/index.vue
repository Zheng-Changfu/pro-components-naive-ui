<script setup lang="tsx">
import { ProField, ValueTypeEnum } from '../field'
import { proTimePickerProps } from './props'
import type { ProTimePickerSlots } from './slots'
import { useProTimePickerInst } from './inst'

defineOptions({
  name: 'ProTime',
})
defineProps(proTimePickerProps)
defineSlots<ProTimePickerSlots>()

const [
  instRef,
  methods,
] = useProTimePickerInst()

defineExpose(methods)
</script>

<template>
  <ProField
    ref="instRef"
    v-bind="$props"
    :default-value="null"
    :value-type="ValueTypeEnum.TIME"
  >
    <template v-for="(_, name) in $slots" :key="name" #[name]="data">
      <slot :name="name" v-bind="data ?? {}" />
    </template>
  </ProField>
</template>
