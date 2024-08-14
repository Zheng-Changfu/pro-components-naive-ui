<script setup lang='tsx'>
import { NDynamicTags, dynamicTagsProps } from 'naive-ui'
import type { ProDynamicTagsSlots } from '../slots'
import { useReadonlyHelpers } from '../../field'

defineOptions({
  name: 'ProFieldDynamicTags',
  inheritAttrs: false,
})
defineProps(dynamicTagsProps)
defineSlots<ProDynamicTagsSlots>()

const {
  empty,
  readonly,
  emptyText,
} = useReadonlyHelpers()
</script>

<template>
  <slot v-if="readonly" name="readonly" v-bind="$props">
    <template v-if="empty">
      {{ emptyText }}
    </template>
    <template v-else>
      <NDynamicTags v-bind="{ ...$props, ...$attrs }" :closable="false" disabled>
        <template v-for="(_, name) in $slots" :key="name" #[name]="data">
          <slot :name="name" v-bind="data ?? {}" />
        </template>
      </NDynamicTags>
    </template>
  </slot>
  <NDynamicTags v-else v-bind="{ ...$props, ...$attrs }">
    <template v-for="(_, name) in $slots" :key="name" #[name]="data">
      <slot :name="name" v-bind="data ?? {}" />
    </template>
  </NDynamicTags>
</template>
