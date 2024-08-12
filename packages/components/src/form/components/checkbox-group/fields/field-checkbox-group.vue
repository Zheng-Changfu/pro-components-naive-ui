<script setup lang='tsx'>
import type { CheckboxGroupProps, CheckboxProps, FlexProps } from 'naive-ui'
import { NCheckbox, NCheckboxGroup, NFlex, checkboxGroupProps } from 'naive-ui'
import type { PropType } from 'vue'
import { get, omit } from 'lodash-es'
import { useReadonlyHelpers } from '../../field'
import type { ProCheckboxGroupSlots } from '../slots'

defineOptions({
  name: 'ProFieldCheckboxGroup',
  inheritAttrs: false,
})
const props = defineProps({
  labelField: String,
  valueField: String,
  flexProps: Object as PropType<FlexProps>,
  options: Array as PropType<Array<CheckboxProps & ([x: string])>>,
  ...checkboxGroupProps,
} as const)
defineSlots<ProCheckboxGroupSlots>()

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

const nCheckboxGroupProps = computed<CheckboxGroupProps>(() => {
  const {
    options,
    flexProps,
    labelField,
    valueField,
    ...rest
  } = props
  return rest
})

const selectedLabels = computed(() => {
  const selectedValue = value.value ?? []
  return normalizedOptions.value
    .filter(item => selectedValue.includes(item.value))
    .map(item => item.label)
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
      {{ $slots.default ? (value ?? []).join('，') : selectedLabels.join('，') }}
    </template>
  </slot>
  <NCheckboxGroup v-else v-bind="{ ...nCheckboxGroupProps, ...$attrs }">
    <template v-if="$slots.default">
      <slot name="default" />
    </template>
    <NFlex v-else v-bind="$props.flexProps ?? {}">
      <NCheckbox v-for="item in normalizedOptions" v-bind="item" :key="item.value" />
    </NFlex>
  </NCheckboxGroup>
</template>
