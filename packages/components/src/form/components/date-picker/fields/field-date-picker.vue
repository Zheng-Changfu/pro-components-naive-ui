<script setup lang='tsx'>
import type { DatePickerProps, TimePickerProps } from 'naive-ui'
import { NDatePicker, NEl, NFlex, datePickerProps } from 'naive-ui'
import type { PropType } from 'vue'
import { computed } from 'vue'
import { isArray, isString } from 'lodash-es'
import type { ProDatePickerSlots } from '../slots'
import { useProDatePickerInst } from '../inst'
import { useReadonlyHelpers } from '../../field'
import { toDisplayDate } from './utils/toDisplayDate'
import { useMergeFormat } from './composables/useMergeFormat'

defineOptions({
  name: 'ProFieldDatePicker',
})
/**
 * 支持 value 传递字符串
 */
const props = defineProps({
  ...datePickerProps,
  value: [String, Number, Array] as PropType<string | number | Array<string | number> | null>,
  formattedValue: [String, Number] as PropType<string | number | Array<string | number> | null>,
} as const)
defineSlots<ProDatePickerSlots>()

const [
  instRef,
  methods,
] = useProDatePickerInst()

const {
  empty,
  value,
  readonly,
  emptyText,
} = useReadonlyHelpers()

const mergedFormat = useMergeFormat(props as any)

/**
 * 传递了 value-format 属性并且 value 是一个字符串或者字符串数组使用 v-model:formattedValue
 * 默认使用 v-model:value
 */
const vModelProps = computed<TimePickerProps>(() => {
  const {
    value,
    valueFormat,
    onUpdateValue,
  } = props
  if (valueFormat && (isString(value) || (isArray(value) && value.every(isString)))) {
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

const convertPlaceholder = computed<DatePickerProps>(() => {
  const { placeholder } = props
  if (!isArray(placeholder)) {
    return { placeholder }
  }
  const [sp, ep] = placeholder
  return {
    endPlaceholder: ep,
    startPlaceholder: sp,
  }
})

const nDatePickerProps = computed<DatePickerProps>(() => {
  const { value, onUpdateValue, placeholder, ...rest } = props
  return {
    ...rest as any,
    ...vModelProps.value,
    ...convertPlaceholder.value,
  }
})

const displayDateText = computed(() => {
  return toDisplayDate(
    value.value,
    mergedFormat.value,
  )
})

const arrayableDateText = computed(() => {
  return isArray(displayDateText.value)
})

defineExpose(methods)
</script>

<template>
  <slot
    v-if="readonly"
    name="readonly"
    v-bind="$props"
  >
    <template v-if="empty">
      {{ emptyText }}
    </template>
    <template v-else>
      <template v-if="arrayableDateText">
        <NFlex :size="[8, 0]">
          <NEl>{{ (displayDateText as [string, string])[0] }}</NEl>
          <NEl>
            <slot name="separator">
              {{ $props.separator }}
            </slot>
          </NEl>
          <NEl>{{ (displayDateText as [string, string])[1] }}</NEl>
        </NFlex>
      </template>
      <template v-else>
        {{ displayDateText }}
      </template>
    </template>
  </slot>
  <NDatePicker
    v-else
    ref="instRef"
    v-bind="nDatePickerProps"
  >
    <template v-for="(_, name) in $slots" :key="name" #[name]="data">
      <slot :name="name" v-bind="data ?? {}" />
    </template>
  </NDatePicker>
</template>
