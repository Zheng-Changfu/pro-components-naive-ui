<script setup lang="tsx">
import { computed } from 'vue'
import { ProField, ValueTypeEnum } from '../field'
import { proRadioGroupProps } from './props'
import type { ProRadioGroupSlots } from './slots'

defineOptions({
  name: 'ProRadioGroup',
})
const props = defineProps(proRadioGroupProps)
defineSlots<ProRadioGroupSlots>()

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
    :default-value="null"
    :value-type="ValueTypeEnum.RADIO_GROUP"
  >
    <template v-for="(_, name) in $slots" :key="name" #[name]="data">
      <slot :name="name" v-bind="data ?? {}" />
    </template>
  </ProField>
</template>
