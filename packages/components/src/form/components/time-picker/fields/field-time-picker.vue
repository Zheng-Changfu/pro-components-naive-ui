<script setup lang='tsx'>
import type { TimePickerProps } from 'naive-ui'
import { NTimePicker, timePickerProps } from 'naive-ui'
import type { PropType } from 'vue'
import { computed } from 'vue'
import { isString } from 'lodash-es'
import type { ProTimePickerSlots } from '../slots'
import { useProTimePickerInst } from '../inst'
import { useReadonlyHelpers } from '../../field'

defineOptions({
  name: 'ProFieldTimePicker',
})
/**
 * 支持 value 传递字符串
 */
const props = defineProps({
  ...timePickerProps,
  value: [String, Number] as PropType<string | number | null>,
  formattedValue: [String, Number] as PropType<string | number | null>,
} as const)
defineSlots<ProTimePickerSlots>()

const [
  instRef,
  methods,
] = useProTimePickerInst()

const {
  readonly,
  readonlyText,
} = useReadonlyHelpers()

/**
 * 传递了 value-format 属性并且 value 是一个字符串 使用 v-model:formattedValue
 * 默认使用 v-model:value
 */
const vModelProps = computed<TimePickerProps>(() => {
  const {
    value,
    valueFormat,
    onUpdateValue,
  } = props

  if (valueFormat && isString(value)) {
    return {
      formattedValue: value,
      onUpdateFormattedValue: onUpdateValue,
    } as any
  }

  return {
    value,
    onUpdateValue,
  }
})

const nTimePickerProps = computed<TimePickerProps>(() => {
  const { value, onUpdateValue, ...rest } = props
  return {
    ...rest as any,
    ...vModelProps.value,
  }
})

defineExpose(methods)
</script>

<template>
  <slot v-if="readonly" name="readonly" v-bind="$props">
    {{ readonlyText }}
  </slot>
  <NTimePicker v-else ref="instRef" v-bind="nTimePickerProps">
    <template v-for="(_, name) in $slots" :key="name" #[name]="data">
      <slot :name="name" v-bind="data ?? {}" />
    </template>
  </NTimePicker>
</template>
