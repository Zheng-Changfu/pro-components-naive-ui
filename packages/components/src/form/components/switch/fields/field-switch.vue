<script setup lang='tsx'>
import { NSwitch, switchProps } from 'naive-ui'
import type { ProSwitchSlots } from '../slots'
import { useReadonlyHelpers } from '../../field'

defineOptions({
  name: 'ProFieldSwitch',
  inheritAttrs: false,
})
defineProps(switchProps)
defineSlots<ProSwitchSlots>()

const {
  value,
  readonly,
} = useReadonlyHelpers()
</script>

<template>
  <slot v-if="readonly" name="readonly" v-bind="$props">
    <slot v-if="!!value" name="checked">
      打开
    </slot>
    <slot v-else name="unchecked">
      关闭
    </slot>
  </slot>
  <NSwitch v-else v-bind="{ ...$props, ...$attrs }">
    <template v-for="(_, name) in $slots" :key="name" #[name]="data">
      <slot :name="name" v-bind="data ?? {}" />
    </template>
  </NSwitch>
</template>
