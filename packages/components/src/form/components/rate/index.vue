<script setup lang='tsx'>
import { ProField, ValueTypeEnum } from '../field'
import { proRateProps } from './props'
import type { ProRateSlots } from './slots'

defineOptions({
  name: 'ProRate',
})
defineProps(proRateProps)
defineSlots<ProRateSlots>()
</script>

<template>
  <ProField
    v-bind="$props"
    :default-value="null"
    :value-type="ValueTypeEnum.RATE"
  >
    <template v-for="(_, name) in $slots" :key="name" #[name]="data">
      <slot :name="name" v-bind="data ?? {}" />
    </template>
  </ProField>
</template>
