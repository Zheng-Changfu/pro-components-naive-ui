<script setup lang='tsx'>
import type { UploadFileInfo, UploadProps } from 'naive-ui'
import { NButton, NUpload, uploadProps } from 'naive-ui'
import { computed, toValue } from 'vue'
import { omit } from 'lodash-es'
import type { ProUploadSlots } from '../slots'
import { useProUploadInst } from '../inst'
import { useReadonlyHelpers } from '../../field'
import { proUploadFieldProps } from '../props'
import { useInjectGlobalConfig } from '../../../../config-provider'
import { useOmitProps } from '../../../../hooks'

defineOptions({
  name: 'ProFieldUpload',
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

const {
  title: globalTitle,
  action: globalAction,
  maxSize: globalMaxSize,
  customRequest: globalCustomRequest,
  onUnAccpetType: globalOnUnAcceptType,
  onBeforeUpload: globalOnBeforeUpload,
  onOverFileMaxSize: globalOnOverFileMaxSize,
} = useInjectGlobalConfig().proUpload

const title = computed(() => {
  const { title } = props
  return toValue(title) ?? toValue(globalTitle)
})

const nUploadProps = computed<UploadProps>(() => {
  const action = props.action ?? globalAction
  const customRequest = props.customRequest ?? globalCustomRequest
  return {
    ...pureProps.value,
    action,
    customRequest,
    onBeforeUpload,
  }
})

function onBeforeUpload(data: {
  file: UploadFileInfo
  fileList: UploadFileInfo[]
}) {
  const {
    onlyAcceptImage,
    maxSize: propMaxSize,
    onUnAccpetType: propOnUnAccpetType,
    onBeforeUpload: propOnBeforeUpload,
    onOverFileMaxSize: propOnOverFileMaxSize,
  } = props

  const fileSize = data.file.file?.size
  const fileName = data.file.file?.name
  const maxSize = propMaxSize ?? globalMaxSize
  const beforeUpload = propOnBeforeUpload ?? globalOnBeforeUpload
  const onUnAcceptType = propOnUnAccpetType ?? globalOnUnAcceptType
  const onOverFileMaxSize = propOnOverFileMaxSize ?? globalOnOverFileMaxSize

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

  if (beforeUpload) {
    return beforeUpload(data as any)
  }
  return true
}

defineExpose(methods)
</script>

<template>
  <slot v-if="readonly" name="readonly" v-bind="$props">
    <template v-if="empty">
      {{ emptyText }}
    </template>
    <template v-else>
      <NUpload v-bind="nUploadProps" disabled>
        <template v-for="(_, name) in omit($slots, 'default')" :key="name" #[name]="data">
          <slot :name="name" v-bind="data ?? {}" />
        </template>
        <template #default>
          <slot name="default">
            <template v-if="nUploadProps.listType === 'image-card'">
              {{ title }}
            </template>
            <template v-else>
              <NButton type="primary">
                {{ title }}
              </NButton>
            </template>
          </slot>
        </template>
      </NUpload>
    </template>
  </slot>
  <NUpload v-else ref="instRef" v-bind="nUploadProps">
    <template v-for="(_, name) in omit($slots, 'default')" :key="name" #[name]="data">
      <slot :name="name" v-bind="data ?? {}" />
    </template>
    <template #default>
      <slot name="default">
        <template v-if="nUploadProps.listType === 'image-card'">
          {{ title }}
        </template>
        <template v-else>
          <NButton type="primary">
            {{ title }}
          </NButton>
        </template>
      </slot>
    </template>
  </NUpload>
</template>
