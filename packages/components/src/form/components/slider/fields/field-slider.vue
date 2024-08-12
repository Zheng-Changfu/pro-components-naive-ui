<script setup lang='tsx'>
import { NSlider, sliderProps } from 'naive-ui'
import type { ProSliderSlots } from '../slots'
import { useReadonlyHelpers } from '../../field'

defineOptions({
  name: 'ProFieldSlider',
  inheritAttrs: false,
})
defineProps(sliderProps)
defineSlots<ProSliderSlots>()

const {
  readonly,
  readonlyText,
} = useReadonlyHelpers()
</script>

<template>
  <slot v-if="readonly" name="readonly" v-bind="$props">
    {{ readonlyText }}
  </slot>
  <NSlider v-else v-bind="{ ...$props, ...$attrs }">
    <template v-for="(_, name) in $slots" :key="name" #[name]="data">
      <slot :name="name" v-bind="data ?? {}" />
    </template>
  </NSlider>
</template>
