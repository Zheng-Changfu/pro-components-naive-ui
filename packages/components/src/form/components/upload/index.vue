<script lang="tsx">
import type { SlotsType } from 'vue'
import { computed, defineComponent, ref, toValue } from 'vue'
import type { UploadFileInfo, UploadInst, UploadProps } from 'naive-ui'
import { NButton, NUpload } from 'naive-ui'
import { uid } from 'pro-components-hooks'
import { isArray, isString } from 'lodash-es'
import { useInjectGlobalConfigContext } from '../../../config-provider'
import { resolveField, useField, useFieldBindValues } from '../../field'
import { isEmptyValue } from '../../form-item/utils/valueUtil'
import { ProFormItem } from '../../form-item'
import { proUploadProps } from './props'
import type { ProUploadSlots } from './slots'
import type { ProUploadInstance } from './inst'

export default defineComponent({
  name: 'ProUpload',
  props: proUploadProps,
  slots: Object as SlotsType<ProUploadSlots>,
  setup(props, { expose }) {
    const nUploadInstRef = ref<UploadInst>()
    const { proUpload } = useInjectGlobalConfigContext()

    const field = useField('ProUpload', props, {
      defaultValue: [],
      postState: convertValueToFile,
    })

    const {
      bindValues,
    } = useFieldBindValues(field, props)

    const {
      title: globalTitle,
      action: globalAction,
      maxSize: globalMaxSize,
      customRequest: globalCustomRequest,
      onUnAccpetType: globalOnUnAcceptType,
      onBeforeUpload: globalOnBeforeUpload,
      onOverFileMaxSize: globalOnOverFileMaxSize,
    } = proUpload

    /**
     * 自动生成 id
     * 支持文件 url 组成的 fileList 回显
     */
    function convertValueToFile(val: any): UploadFileInfo[] {
      const { postState } = props
      if (isEmptyValue(val)) {
        return postState ? postState(val) : []
      }
      if (!isArray(val)) {
        val = [val].filter(Boolean)
      }
      const fileList = val.map((file: any) => {
        if (isString(file)) {
          return {
            id: uid(),
            url: val,
            name: val,
            status: 'finished',
          }
        }
        return {
          id: uid(),
          ...file,
        }
      })
      return postState
        ? postState(fileList)
        : fileList
    }

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
      } = bindValues.value

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

    const nUploadProps = computed<UploadProps>(() => {
      const { value, doUpdateValue } = field
      const {
        title,
        maxSize,
        onUnAccpetType,
        onlyAcceptImage,
        onOverFileMaxSize,
        action: propAction,
        customRequest: propCustomRequest,
        ...rest
      } = bindValues.value
      const action = propAction ?? globalAction
      const customRequest = propCustomRequest ?? globalCustomRequest
      return {
        ...rest,
        'defaultFileList': undefined,
        'onUpdate:fileList': undefined,

        'ref': nUploadInstRef,
        'fileList': value.value,
        action,
        customRequest,
        onBeforeUpload,
        'onUpdateFileList': doUpdateValue,
      }
    })

    const title = computed(() => {
      const { title } = bindValues.value
      return toValue(title) ?? toValue(globalTitle)
    })

    const exposed: ProUploadInstance = {
      clear: () => nUploadInstRef.value?.clear(),
      openOpenFileDialog: () => nUploadInstRef.value?.openOpenFileDialog(),
      submit: (...args: any[]) => ((nUploadInstRef.value?.submit) as any)(...args),
    }

    expose(exposed)
    return {
      title,
      nUploadProps,
    }
  },
  render() {
    const {
      $slots,
      $props,
    } = this

    return (
      <ProFormItem
        {...$props}
        v-slots={{
          default: () => {
            return resolveField(
              $props.fieldRender,
              {
                bindSlots: $slots,
                bindValues: this.nUploadProps,
              },
              () => (
                <NUpload
                  {...this.nUploadProps}
                  v-slots={{
                    ...$slots,
                    default: () => {
                      if ($slots.default) {
                        return $slots.default()
                      }
                      if (this.nUploadProps.listType === 'image-card') {
                        return this.title
                      }
                      return <NButton type="primary">{this.title}</NButton>
                    },
                  }}
                />
              ),
            )
          },
        }}
      >
      </ProFormItem>
    )
  },
})
</script>
