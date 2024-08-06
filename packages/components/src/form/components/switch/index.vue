<script setup lang='tsx'>
import { ProField, ValueTypeEnum } from '../field'
import { proSwitchProps } from './props'
import type { ProSwitchSlots } from './slots'

defineOptions({
  name: 'ProSwitch',
})
defineProps(proSwitchProps)
defineSlots<ProSwitchSlots>()
</script>

<template>
  <ProField
    v-bind="$props"
    :default-value="false"
    :value-type="ValueTypeEnum.SWITCH"
  >
    <template v-for="(_, name) in $slots" :key="name" #[name]="data">
      <slot :name="name" v-bind="data ?? {}" />
    </template>
  </ProField>
</template>
