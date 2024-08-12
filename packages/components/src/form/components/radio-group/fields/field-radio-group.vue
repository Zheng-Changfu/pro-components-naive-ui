<script setup lang='tsx'>
import type { FlexProps, RadioGroupProps, RadioProps } from 'naive-ui'
import { NFlex, NRadio, NRadioGroup, radioGroupProps } from 'naive-ui'
import type { PropType } from 'vue'
import { get, omit } from 'lodash-es'
import { useReadonlyHelpers } from '../../field'
import type { ProRadioGroupSlots } from '../slots'

defineOptions({
  name: 'ProFieldRadioGroup',
  inheritAttrs: false,
})
const props = defineProps({
  labelField: String,
  valueField: String,
  flexProps: Object as PropType<FlexProps>,
  options: Array as PropType<Array<RadioProps & ([x: string])>>,
  ...radioGroupProps,
} as const)
defineSlots<ProRadioGroupSlots>()

const {
  empty,
  value,
  readonly,
  emptyText,
} = useReadonlyHelpers()

const normalizedOptions = computed(() => {
  const {
    options = [],
    labelField = 'label',
    valueField = 'value',
  } = props

  return options.map((item) => {
    const label = get(item, labelField)
    const value = get(item, valueField)
    return {
      ...omit(item, [labelField, valueField]),
      label,
      value,
    }
  })
})

const nRadioGroupProps = computed<RadioGroupProps>(() => {
  const {
    options,
    flexProps,
    labelField,
    valueField,
    ...rest
  } = props
  return rest
})

const selectedLabel = computed(() => {
  const selectedValue = value.value
  const valueLabelOption = normalizedOptions.value.find(item => item.value === selectedValue)
  return valueLabelOption ? (valueLabelOption.label ?? selectedValue) : selectedValue
})
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
      {{ $slots.default ? value : selectedLabel }}
    </template>
  </slot>
  <NRadioGroup v-else v-bind="{ ...nRadioGroupProps, ...$attrs }">
    <template v-if="$slots.default">
      <slot name="default" />
    </template>
    <NFlex v-else v-bind="$props.flexProps ?? {}">
      <NRadio v-for="item in normalizedOptions" v-bind="item" :key="item.value" />
    </NFlex>
  </NRadioGroup>
</template>
