<script setup lang='tsx'>
import { ProField, ValueTypeEnum } from '../field'
import { proColorPickerProps } from './props'
import type { ProColorPickerSlots } from './slots'

defineOptions({
  name: 'ProColorPicker',
})
defineProps(proColorPickerProps)
defineSlots<ProColorPickerSlots>()
</script>

<template>
  <ProField
    v-bind="$props"
    :default-value="null"
    :value-type="ValueTypeEnum.COLOR_PICKER"
  >
    <template v-for="(_, name) in $slots" :key="name" #[name]="data">
      <slot :name="name" v-bind="data ?? {}" />
    </template>
  </ProField>
</template>
