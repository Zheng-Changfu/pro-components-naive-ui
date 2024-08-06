<script setup lang='tsx'>
import { NRate, rateProps } from 'naive-ui'
import type { ProRateSlots } from '../slots'
import { useReadonlyHelpers } from '../../field'

defineOptions({
  name: 'ProFieldRate',
})
defineProps(rateProps)
defineSlots<ProRateSlots>()

const {
  readonly,
} = useReadonlyHelpers()
</script>

<template>
  <slot v-if="readonly" name="readonly" v-bind="$props">
    <NRate v-bind="$props" readonly>
      <template v-for="(_, name) in $slots" :key="name" #[name]="data">
        <slot :name="name" v-bind="data ?? {}" />
      </template>
    </NRate>
  </slot>
  <NRate v-else v-bind="$props">
    <template v-for="(_, name) in $slots" :key="name" #[name]="data">
      <slot :name="name" v-bind="data ?? {}" />
    </template>
  </NRate>
</template>
