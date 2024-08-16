<script setup lang="tsx">
import { computed } from 'vue'
import { ProField, ValueTypeEnum } from '../field'
import { proRadioGroupProps } from './props'
import type { ProRadioGroupSlots } from './slots'

defineOptions({
  name: 'ProRadioGroup',
})
defineProps(proRadioGroupProps)
defineSlots<ProRadioGroupSlots>()
</script>

<template>
  <ProField
    v-bind="$props"
    :default-value="null"
    :value-type="ValueTypeEnum.RADIO_GROUP"
  >
    <template v-for="(_, name) in $slots" :key="name" #[name]="data">
      <slot :name="name" v-bind="data ?? {}" />
    </template>
  </ProField>
</template>
