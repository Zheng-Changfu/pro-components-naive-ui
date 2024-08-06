<script setup lang='tsx'>
import { ProField, ValueTypeEnum } from '../field'
import { proInputProps } from './props'
import type { ProInputSlots } from './slots'
import { useProPasswordInst } from './inst'

defineOptions({
  name: 'ProPassword',
})
defineProps(proInputProps)
defineSlots<ProInputSlots>()

const [
  instRef,
  methods,
] = useProPasswordInst()

defineExpose(methods)
</script>

<template>
  <ProField
    ref="instRef"
    v-bind="$props"
    :default-value="null"
    :value-type="ValueTypeEnum.PASSWORD"
    :field-props="{
      ...($props.fieldProps ?? {}),
      type: 'password',
    }"
  >
    <template v-for="(_, name) in $slots" :key="name" #[name]="data">
      <slot :name="name" v-bind="data ?? {}" />
    </template>
  </ProField>
</template>
