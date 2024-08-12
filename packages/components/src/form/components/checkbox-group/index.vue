<script setup lang="tsx">
import { computed } from 'vue'
import { ProField, ValueTypeEnum } from '../field'
import { proCheckboxGroupProps } from './props'
import type { ProCheckboxGroupSlots } from './slots'

defineOptions({
  name: 'ProCheckboxGroup',
})
const props = defineProps(proCheckboxGroupProps)
defineSlots<ProCheckboxGroupSlots>()

const proFieldProps = computed(() => {
  const { flexProps, fieldProps, ...rest } = props
  return {
    ...rest,
    fieldProps: {
      flexProps,
      ...fieldProps,
    },
  }
})
</script>

<template>
  <ProField
    v-bind="proFieldProps"
    :default-value="[]"
    :value-type="ValueTypeEnum.CHECKBOX_GROUP"
  >
    <template v-for="(_, name) in $slots" :key="name" #[name]="data">
      <slot :name="name" v-bind="data ?? {}" />
    </template>
  </ProField>
</template>
