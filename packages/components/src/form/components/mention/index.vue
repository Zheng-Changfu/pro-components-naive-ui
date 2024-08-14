<script setup lang='tsx'>
import { ProField, ValueTypeEnum } from '../field'
import { proMentionProps } from './props'
import type { ProMentionSlots } from './slots'
import { useMentionInst } from './inst'

defineOptions({
  name: 'ProMention',
})
defineProps(proMentionProps)
defineSlots<ProMentionSlots>()

const [
  instRef,
  methods,
] = useMentionInst()

defineExpose(methods)
</script>

<template>
  <ProField
    ref="instRef"
    v-bind="$props"
    :default-value="null"
    :value-type="ValueTypeEnum.MENTION"
  >
    <template v-for="(_, name) in $slots" :key="name" #[name]="data">
      <slot :name="name" v-bind="data ?? {}" />
    </template>
  </ProField>
</template>
