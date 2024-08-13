<script setup lang='tsx'>
import type { UploadFileInfo, UploadProps } from 'naive-ui'
import { NButton, NUpload, uploadProps } from 'naive-ui'
import { computed } from 'vue'
import { omit } from 'lodash-es'
import type { ProUploadSlots } from '../slots'
import { useProUploadInst } from '../inst'
import { useReadonlyHelpers } from '../../field'
import { proUploadFieldProps } from '../props'
import { useOmitProps } from '../../../../hooks'
import { useLocale } from '../../../../locales'

defineOptions({
  name: 'ProFieldUpload',
  inheritAttrs: false,
})
const props = defineProps({
  ...uploadProps,
  ...proUploadFieldProps,
})
defineSlots<ProUploadSlots>()

const [
  instRef,
  methods,
] = useProUploadInst()

const {
  empty,
  readonly,
  emptyText,
} = useReadonlyHelpers()

const pureProps = useOmitProps(
  props,
  proUploadFieldProps,
)

const { localeRef } = useLocale('ProUpload')

const nUploadProps = computed<UploadProps>(() => {
  return {
    ...pureProps.value,
    onBeforeUpload,
  }
})

function onBeforeUpload(data: {
  file: UploadFileInfo
  fileList: UploadFileInfo[]
}) {
  const {
    maxSize,
    onUnAcceptType,
    onlyAcceptImage,
    onOverFileMaxSize,
    onBeforeUpload: propOnBeforeUpload,
  } = props

  const fileSize = data.file.file?.size
  const fileName = data.file.file?.name

  if (
    onlyAcceptImage
    && fileName
    // eslint-disable-next-line regexp/no-unused-capturing-group
    && !/\.(jpg|jpeg|png|gif|webp)$/i.test(fileName)
  ) {
    onUnAcceptType && onUnAcceptType(data)
    return false
  }

  if (
    maxSize
    && fileSize
    && fileSize > maxSize
  ) {
    onOverFileMaxSize && onOverFileMaxSize(maxSize, data)
    return false
  }

  if (propOnBeforeUpload) {
    return propOnBeforeUpload(data as any)
  }
  return true
}

/**
 * issues: https://github.com/tusen-ai/naive-ui/issues/5312
 */
function fixUploadDragger() {
  const inst = instRef.value as any
  if (inst.$slots?.default) {
    const defaultSlot = inst.$slots.default()[0] as any
    if (defaultSlot.children?.[0]?.children?.[0]?.type?.name === 'UploadDragger') {
      inst.draggerInsideRef.value = true
    }
  }
}

onMounted(fixUploadDragger)
defineExpose(methods)
</script>

<template>
  <slot v-if="readonly" name="readonly" v-bind="$props">
    <template v-if="empty">
      {{ emptyText }}
    </template>
    <template v-else>
      <NUpload v-bind="{ ...nUploadProps, ...$attrs }" disabled>
        <template v-for="(_, name) in omit($slots, 'default')" :key="name" #[name]="data">
          <slot :name="name" v-bind="data ?? {}" />
        </template>
        <template #default>
          <slot name="default">
            <template v-if="nUploadProps.listType === 'image-card'">
              {{ localeRef.title }}
            </template>
            <template v-else>
              <NButton type="primary">
                {{ localeRef.title }}
              </NButton>
            </template>
          </slot>
        </template>
      </NUpload>
    </template>
  </slot>
  <NUpload v-else ref="instRef" v-bind="{ ...nUploadProps, ...$attrs }">
    <template v-for="(_, name) in omit($slots, 'default')" :key="name" #[name]="data">
      <slot :name="name" v-bind="data ?? {}" />
    </template>
    <template #default>
      <slot name="default">
        <template v-if="nUploadProps.listType === 'image-card'">
          {{ localeRef.title }}
        </template>
        <template v-else>
          <NButton type="primary">
            {{ localeRef.title }}
          </NButton>
        </template>
      </slot>
    </template>
  </NUpload>
</template>
