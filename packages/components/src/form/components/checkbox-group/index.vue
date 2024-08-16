<script setup lang="tsx">
import { ProField, ValueTypeEnum } from '../field'
import { proCheckboxGroupProps } from './props'
import type { ProCheckboxGroupSlots } from './slots'

defineOptions({
  name: 'ProCheckboxGroup',
})
defineProps(proCheckboxGroupProps)
defineSlots<ProCheckboxGroupSlots>()
</script>

<template>
  <ProField
    v-bind="$props"
    :default-value="[]"
    :value-type="ValueTypeEnum.CHECKBOX_GROUP"
  >
    <template v-for="(_, name) in $slots" :key="name" #[name]="data">
      <slot :name="name" v-bind="data ?? {}" />
    </template>
  </ProField>
</template>
