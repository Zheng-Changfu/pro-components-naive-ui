<script setup lang="tsx">
import { ProField, ValueTypeEnum } from '../field'
import { proTransferProps } from './props'
import type { ProTransferSlots } from './slots'

defineOptions({
  name: 'ProTransfer',
})
defineProps(proTransferProps)
defineSlots<ProTransferSlots>()
</script>

<template>
  <ProField
    v-bind="$props"
    :default-value="[]"
    :value-type="ValueTypeEnum.TRANSFER"
  >
    <template v-for="(_, name) in $slots" :key="name" #[name]="data">
      <slot :name="name" v-bind="data ?? {}" />
    </template>
  </ProField>
</template>
