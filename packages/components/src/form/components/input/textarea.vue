<script setup lang='tsx'>
import { ProField, ValueTypeEnum } from '../field'
import { proInputProps } from './props'
import type { ProInputSlots } from './slots'
import { useProTextareaInst } from './inst'

defineOptions({
  name: 'ProTextarea',
})
defineProps(proInputProps)
defineSlots<ProInputSlots>()

const [
  instRef,
  methods,
] = useProTextareaInst()

defineExpose(methods)
</script>

<template>
  <ProField
    ref="instRef"
    v-bind="$props"
    :default-value="null"
    :value-type="ValueTypeEnum.TEXTAREA"
    :field-props="{
      ...($props.fieldProps ?? {}),
      type: 'textarea',
    }"
  >
    <template v-for="(_, name) in $slots" :key="name" #[name]="data">
      <slot :name="name" v-bind="data ?? {}" />
    </template>
  </ProField>
</template>
