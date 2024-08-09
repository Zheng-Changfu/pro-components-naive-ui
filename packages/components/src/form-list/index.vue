<script setup lang="tsx">
import { computed } from 'vue'
import { uid } from 'pro-components-hooks'
import { isArray } from 'lodash-es'
import { ProField, ValueTypeEnum } from '../form/components'
import { useMountStyle } from '../_internal/useMountStyle'
import { proFormListProps } from './props'
import type { ProFormListSlots } from './slots'
import { AUTO_CREATE_ID } from './context'
import style from './styles/index.cssr'
import { useProFormListInst } from './inst'

defineOptions({
  name: 'ProFormList',
})
const props = defineProps(proFormListProps)
defineSlots<ProFormListSlots>()

const [
  instRef,
  methods,
] = useProFormListInst()

const separateProps = computed(() => {
  const {
    min,
    max,
    position,
    actionGuard,
    copyButtonProps,
    removeButtonProps,
    creatorButtonProps,
    creatorInitialValue,
    onlyShowFirstItemLabel,
    ...proFieldProps
  } = props

  return {
    proFieldProps,
    fieldListProps: {
      min,
      max,
      position,
      actionGuard,
      copyButtonProps,
      removeButtonProps,
      creatorButtonProps,
      creatorInitialValue,
      onlyShowFirstItemLabel,
    },
  }
})

useMountStyle(
  'pro-form-item',
  style,
)

function autoCreateRowId(val: any) {
  const { postState } = props
  if (!isArray(val)) {
    return postState ? postState(val) : []
  }
  const normalizedVals = val.map((item) => {
    return item[AUTO_CREATE_ID]
      ? item
      : { ...item, [AUTO_CREATE_ID]: uid() }
  })
  return postState
    ? postState(normalizedVals)
    : normalizedVals
}

defineExpose(methods)
</script>

<template>
  <ProField
    ref="instRef"
    v-bind="separateProps.proFieldProps"
    class="n-pro-form-item"
    is-list
    :post-state="autoCreateRowId"
    :value-type="ValueTypeEnum.FORM_LIST"
    :field-props="separateProps.fieldListProps"
  >
    <template v-for="(_, name) in $slots" :key="name" #[name]="data">
      <slot :name="name" v-bind="data ?? {}" />
    </template>
  </ProField>
</template>
