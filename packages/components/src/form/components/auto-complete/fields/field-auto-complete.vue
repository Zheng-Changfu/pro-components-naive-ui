<script setup lang='tsx'>
import type { AutoCompleteProps } from 'naive-ui'
import { NAutoComplete, autoCompleteProps } from 'naive-ui'
import type { PropType } from 'vue'
import { isFunction } from 'lodash-es'
import type { ProAutoCompleteSlots } from '../slots'
import { useReadonlyHelpers } from '../../field'
import { useProAutoCompleteInst } from '../inst'

defineOptions({
  name: 'ProFieldAutoComplete',
  inheritAttrs: false,
})
const props = defineProps({
  ...autoCompleteProps,
  options: {
    type: [Array, Function] as PropType<
      | AutoCompleteProps['options']
      | ((value: string | null) => NonNullable<AutoCompleteProps['options']>)
    >,
    default: [],
  },
} as const)
defineSlots<ProAutoCompleteSlots>()

const [
  instRef,
  methods,
] = useProAutoCompleteInst()

const {
  value,
  readonly,
  readonlyText,
} = useReadonlyHelpers()

const nAutoCompleteOptions = computed(() => {
  const { options = [] } = props
  return isFunction(options) ? options(value.value) : options
})

const nAutoCompleteProps = computed<AutoCompleteProps>(() => {
  return {
    ...props,
    options: nAutoCompleteOptions.value,
  }
})

defineExpose(methods)
</script>

<template>
  <slot v-if="readonly" name="readonly" v-bind="$props">
    {{ readonlyText }}
  </slot>
  <NAutoComplete v-else ref="instRef" v-bind="{ ...nAutoCompleteProps, ...$attrs }">
    <template v-for="(_, name) in $slots" :key="name" #[name]="data">
      <slot :name="name" v-bind="data ?? {}" />
    </template>
  </NAutoComplete>
</template>
