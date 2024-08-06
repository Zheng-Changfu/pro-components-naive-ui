<script setup lang='tsx'>
import { ProField, ValueTypeEnum } from '../field'
import { proDatePickerProps } from './props'
import type { ProDatePickerSlots } from './slots'
import { useProDatePickerInst } from './inst'

defineOptions({
  name: 'ProDateTime',
})
defineProps(proDatePickerProps)
defineSlots<ProDatePickerSlots>()

const [
  instRef,
  methods,
] = useProDatePickerInst()

defineExpose(methods)
</script>

<template>
  <ProField
    ref="instRef"
    v-bind="$props"
    :default-value="null"
    :field-props="{
      ...($props.fieldProps ?? {}),
      type: 'datetime',
    }"
    :value-type="ValueTypeEnum.DATE_TIME"
  >
    <template v-for="(_, name) in $slots" :key="name" #[name]="data">
      <slot :name="name" v-bind="data ?? {}" />
    </template>
  </ProField>
</template>
