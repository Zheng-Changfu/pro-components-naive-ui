<script setup lang='tsx'>
import { ProField, ValueTypeEnum } from '../field'
import { proDynamicTagsProps } from './props'
import type { ProDynamicTagsSlots } from './slots'

defineOptions({
  name: 'ProDynamicTags',
})
defineProps(proDynamicTagsProps)
defineSlots<ProDynamicTagsSlots>()
</script>

<template>
  <ProField
    v-bind="$props"
    :default-value="[]"
    :value-type="ValueTypeEnum.DYNAMIC_TAGS"
  >
    <template v-for="(_, name) in $slots" :key="name" #[name]="data">
      <slot :name="name" v-bind="data ?? {}" />
    </template>
  </ProField>
</template>
