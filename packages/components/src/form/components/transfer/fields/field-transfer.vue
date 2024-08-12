<script setup lang='tsx'>
import type { TransferProps } from 'naive-ui'
import { NTransfer, transferProps } from 'naive-ui'
import { get, omit } from 'lodash-es'
import { useReadonlyHelpers } from '../../field'

defineOptions({
  name: 'ProFieldTransfer',
  inheritAttrs: false,
})
const props = defineProps({
  ...transferProps,
  labelField: String,
  valueField: String,
  placeholder: Array,
} as const)

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

const nTransferProps = computed<TransferProps>(() => {
  const { placeholder, ...rest } = props
  const [s, t] = placeholder ?? []
  return {
    ...rest,
    options: normalizedOptions.value,
    sourceFilterPlaceholder: s as string,
    targetFilterPlaceholder: t as string,
  }
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
      {{ selectedLabels.join('，') }}
    </template>
  </slot>
  <NTransfer v-else v-bind="{ ...nTransferProps, ...$attrs }" />
</template>
