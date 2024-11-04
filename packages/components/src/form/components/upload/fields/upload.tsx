import type { UploadFileInfo, UploadProps } from 'naive-ui'
import type { SlotsType } from 'vue'
import type { ProUploadSlots } from '../slots'
import { NButton, NUpload, uploadProps } from 'naive-ui'
import { computed } from 'vue'
import { useOmitProps } from '../../../../composables'
import { useLocale } from '../../../../locales'
import { useReadonlyHelpers } from '../../field'
import { useInjectUploadInstStore } from '../inst'
import { proUploadFieldProps } from '../props'

export default defineComponent({
  name: 'Upload',
  props: {
    ...uploadProps,
    ...proUploadFieldProps,
  },
  slots: Object as SlotsType<ProUploadSlots>,
  inheritAttrs: false,
  setup(props) {
    const {
      instRef,
      registerInst,
    } = useInjectUploadInstStore()!

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
        ...pureProps.value as UploadProps,
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
      if (!props.directory && !props.directoryDnd)
        return
      const inst = instRef.value as any
      if (inst?.$slots?.default) {
        const defaultSlot = inst.$slots.default()[0] as any
        if (defaultSlot.children?.[0]?.children?.[0]?.type?.name === 'UploadDragger') {
          inst.draggerInsideRef.value = true
        }
      }
    }

    registerInst({
      clear: () => instRef.value?.clear(),
      submit: (fileId?: string) => instRef.value?.submit(fileId),
      openOpenFileDialog: () => instRef.value?.openOpenFileDialog(),
    })

    return {
      empty,
      instRef,
      readonly,
      emptyText,
      localeRef,
      nUploadProps,
      fixUploadDragger,
    }
  },
  render() {
    this.fixUploadDragger()
    if (this.readonly) {
      const { empty, emptyText } = this

      if (this.$slots.readonly) {
        return this.$slots.readonly(this.$props)
      }
      if (empty) {
        return emptyText
      }

      return (
        <NUpload
          ref="instRef"
          {...this.$attrs}
          {...this.nUploadProps}
          disabled={true}
        >
          {{
            ...this.$slots,
            default: () => {
              if (this.$slots.default) {
                return this.$slots.default()
              }
              if (this.nUploadProps.listType === 'image-card') {
                return this.localeRef.title
              }
              return <NButton type="primary">{ this.localeRef.title }</NButton>
            },
          }}
        </NUpload>
      )
    }
    return (
      <NUpload
        ref="instRef"
        {...this.$attrs}
        {...this.nUploadProps}
      >
        {{
          ...this.$slots,
          default: () => {
            if (this.$slots.default) {
              return this.$slots.default()
            }
            if (this.nUploadProps.listType === 'image-card') {
              return this.localeRef.title
            }
            return <NButton type="primary">{ this.localeRef.title }</NButton>
          },
        }}
      </NUpload>
    )
  },
})
