<script setup lang='tsx'>
import { NColorPicker, colorPickerProps } from 'naive-ui'
import type { ProColorPickerSlots } from '../slots'
import { useReadonlyHelpers } from '../../field'

defineOptions({
  name: 'ProFieldColorPicker',
  inheritAttrs: false,
})
defineProps(colorPickerProps)
defineSlots<ProColorPickerSlots>()

const {
  readonly,
} = useReadonlyHelpers()
</script>

<template>
  <slot v-if="readonly" name="readonly" v-bind="$props">
    <NColorPicker v-bind="$props" disabled>
      <template v-for="(_, name) in $slots" :key="name" #[name]="data">
        <slot :name="name === 'title' ? 'label' : ''" v-bind="data ?? {}" />
      </template>
    </NColorPicker>
  </slot>
  <NColorPicker v-else v-bind="{ ...$props, ...$attrs }">
    <template v-for="(_, name) in $slots" :key="name" #[name]="data">
      <slot :name="name === 'title' ? 'label' : ''" v-bind="data ?? {}" />
    </template>
  </NColorPicker>
</template>
