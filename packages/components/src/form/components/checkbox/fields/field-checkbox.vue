<script setup lang='tsx'>
import { NCheckbox, checkboxProps } from 'naive-ui'
import type { ProCheckboxSlots } from '../slots'
import { useProCheckboxInst } from '../inst'
import { useReadonlyHelpers } from '../../field'

defineOptions({
  name: 'ProFieldCheckbox',
  inheritAttrs: false,
})
defineProps(checkboxProps)
defineSlots<ProCheckboxSlots>()

const [
  instRef,
  methods,
] = useProCheckboxInst()

const {
  readonly,
} = useReadonlyHelpers()

defineExpose(methods)
</script>

<template>
  <slot
    v-if="readonly"
    name="readonly"
    v-bind="$props"
  >
    <NCheckbox
      v-bind="{ ...$props, ...$attrs }"
      disabled
    >
      <template v-for="(_, name) in $slots" :key="name" #[name]="data">
        <slot :name="name" v-bind="data ?? {}" />
      </template>
    </NCheckbox>
  </slot>
  <NCheckbox
    v-else
    ref="instRef"
    v-bind="{ ...$props, ...$attrs }"
  >
    <template v-for="(_, name) in $slots" :key="name" #[name]="data">
      <slot :name="name" v-bind="data ?? {}" />
    </template>
  </NCheckbox>
</template>
