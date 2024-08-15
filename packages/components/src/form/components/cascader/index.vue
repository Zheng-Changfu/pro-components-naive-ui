<script setup lang='tsx'>
import { ProField, ValueTypeEnum } from '../field'
import { proCascaderProps } from './props'
import type { ProCascaderSlots } from './slots'
import { useCascaderInst } from './inst'

defineOptions({
  name: 'ProCascader',
})
defineProps(proCascaderProps)
defineSlots<ProCascaderSlots>()

const [
  instRef,
  methods,
] = useCascaderInst()

defineExpose(methods)
</script>

<template>
  <ProField
    ref="instRef"
    v-bind="$props"
    :default-value="null"
    :value-type="ValueTypeEnum.CASCADER"
  >
    <template v-for="(_, name) in $slots" :key="name" #[name]="data">
      <slot :name="name" v-bind="data ?? {}" />
    </template>
  </ProField>
</template>
