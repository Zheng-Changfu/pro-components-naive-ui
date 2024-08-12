<script setup lang='tsx'>
import { isString } from 'lodash-es'
import { ProField, ValueTypeEnum } from '../field'
import { proDigitProps } from './props'
import type { ProDigitSlots } from './slots'
import { useProDigitInst } from './inst'

defineOptions({
  name: 'ProDigit',
})
const props = defineProps(proDigitProps)
defineSlots<ProDigitSlots>()

const [
  instRef,
  methods,
] = useProDigitInst()

function tryConvertStringToNumber(val: any) {
  if (props.postState) {
    return props.postState(val)
  }
  if (isString(val)) {
    if (val === '') {
      return null
    }
    const v = Number(val)
    return Number.isNaN(v) ? val : v
  }
  return val
}

defineExpose(methods)
</script>

<template>
  <ProField
    ref="instRef"
    v-bind="$props"
    :default-value="null"
    :value-type="ValueTypeEnum.DIGIT"
    :post-state="tryConvertStringToNumber"
  >
    <template v-for="(_, name) in $slots" :key="name" #[name]="data">
      <slot :name="name" v-bind="data ?? {}" />
    </template>
  </ProField>
</template>
