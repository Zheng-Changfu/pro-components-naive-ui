<script setup lang="tsx">
import { ProField, ValueTypeEnum } from '../field'
import { proUploadProps } from './props'
import type { ProUploadSlots } from './slots'
import { useProUploadInst } from './inst'
import { convertValueToFile } from './utils/file'

defineOptions({
  name: 'ProUpload',
})
const props = defineProps(proUploadProps)
defineSlots<ProUploadSlots>()

const [
  instRef,
  methods,
] = useProUploadInst()

function postState(val: any) {
  return convertValueToFile(val, props.postState)
}

defineExpose(methods)
</script>

<template>
  <ProField
    ref="instRef"
    v-bind="$props"
    :default-value="[]"
    :post-state="postState"
    value-model-name="fileList"
    :value-type="ValueTypeEnum.UPLOAD"
  >
    <template v-for="(_, name) in $slots" :key="name" #[name]="data">
      <slot :name="name" v-bind="data ?? {}" />
    </template>
  </ProField>
</template>
