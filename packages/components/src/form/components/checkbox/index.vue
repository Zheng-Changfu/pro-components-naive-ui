<script setup lang='tsx'>
import { ProField, ValueTypeEnum } from '../field'
import { proCheckboxProps } from './props'
import type { ProCheckboxSlots } from './slots'
import { useProCheckboxInst } from './inst'

defineOptions({
  name: 'ProCheckbox',
})
defineProps(proCheckboxProps)
defineSlots<ProCheckboxSlots>()

const [
  instRef,
  methods,
] = useProCheckboxInst()

defineExpose(methods)
</script>

<template>
  <ProField
    ref="instRef"
    v-bind="$props"
    :default-value="false"
    value-model-name="checked"
    :value-type="ValueTypeEnum.CHECKBOX"
  >
    <template v-for="(_, name) in $slots" :key="name" #[name]="data">
      <slot :name="name" v-bind="data ?? {}" />
    </template>
  </ProField>
</template>
