<script setup lang='tsx'>
import { NMention, mentionProps } from 'naive-ui'
import type { ProMentionSlots } from '../slots'
import { useMentionInst } from '../inst'
import { useReadonlyHelpers } from '../../field'

defineOptions({
  name: 'ProFieldMention',
  inheritAttrs: false,
})
defineProps(mentionProps)
defineSlots<ProMentionSlots>()

const [
  instRef,
  methods,
] = useMentionInst()

const {
  readonly,
  readonlyText,
} = useReadonlyHelpers()

defineExpose(methods)
</script>

<template>
  <slot v-if="readonly" name="readonly" v-bind="$props">
    {{ readonlyText }}
  </slot>
  <NMention v-else ref="instRef" v-bind="{ ...$props, ...$attrs }">
    <template v-for="(_, name) in $slots" :key="name" #[name]="data">
      <slot :name="name" v-bind="data ?? {}" />
    </template>
  </NMention>
</template>
