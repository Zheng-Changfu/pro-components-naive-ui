<script lang='tsx'>
import type { UploadFileInfo, UploadProps } from 'naive-ui'
import { NButton, NUpload, uploadProps } from 'naive-ui'
import type { SlotsType } from 'vue'
import { computed, defineComponent, toValue } from 'vue'
import type { ProUploadSlots } from '../slots'
import { useProUploadInst } from '../inst'
import { useReadonlyHelpers } from '../../field'
import { proUploadFieldProps } from '../props'
import { useInjectGlobalConfig } from '../../../../config-provider'
import { useOmitProps } from '../../../../hooks'

export default defineComponent({
  name: 'FieldUpload',
  props: {
    ...uploadProps,
    ...proUploadFieldProps,
  },
  slots: Object as SlotsType<ProUploadSlots>,
  setup(props, { expose }) {
    const [
      instRef,
      methods,
    ] = useProUploadInst()

    const {
      empty,
      emptyText,
      readonly,
      readonlyRender,
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

    expose(methods)
    return {
      empty,
      title,
      instRef,
      readonly,
      emptyText,
      nUploadProps,
      readonlyRender,
    }
  },
  render() {
    const {
      title,
      empty,
      $slots,
      readonly,
      emptyText,
      nUploadProps,
      readonlyRender,
    } = this

    function renderChildren() {
      if ($slots.default) {
        return $slots.default()
      }
      if (nUploadProps.listType === 'image-card') {
        return title
      }
      return <NButton type="primary">{title}</NButton>
    }

    if (readonly) {
      if (readonlyRender) {
        return readonlyRender()
      }
      if (empty) {
        return emptyText
      }
      return (
        <NUpload
          {...nUploadProps}
          disabled={true}
          v-slots={{
            ...$slots,
            default: renderChildren,
          }}
        />
      )
    }

    return (
      <NUpload
        ref="instRef"
        {...nUploadProps}
        v-slots={{
          ...$slots,
          default: renderChildren,
        }}
      />
    )
  },
})
</script>
