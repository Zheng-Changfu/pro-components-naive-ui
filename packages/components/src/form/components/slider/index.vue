<script setup lang='tsx'>
import { ProField, ValueTypeEnum } from '../field'
import { proSliderProps } from './props'
import type { ProSliderSlots } from './slots'

defineOptions({
  name: 'ProSlider',
})
defineProps(proSliderProps)
defineSlots<ProSliderSlots>()
</script>

<template>
  <ProField
    v-bind="$props"
    :default-value="null"
    :value-type="ValueTypeEnum.SLIDER"
  >
    <template v-for="(_, name) in $slots" :key="name" #[name]="data">
      <slot :name="name" v-bind="data ?? {}" />
    </template>
  </ProField>
</template>
