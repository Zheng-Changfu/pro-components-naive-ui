<script lang="tsx">
import type { SlotsType } from 'vue'
import { computed, defineComponent, ref, toRef } from 'vue'
import type { UploadFileInfo, UploadInst, UploadProps } from 'naive-ui'
import { NButton, NUpload } from 'naive-ui'
import { createField, uid, useCompile } from 'pro-components-hooks'
import { isArray, isString } from 'lodash-es'
import { useOmitSlots } from '../hooks/useOmitSlots'
import type { ProComponentConfig } from '../form'
import { ProComponentConfigKey, ProFormItem, useGetProFieldProps } from '../form'
import { useInjectGlobalConfigContext } from '../config-provider'
import { proUploadProps } from './props'
import type { ProUploadSlots } from './slots'
import { proUploadExtendSlotKeys } from './slots'
import type { ProUploadInstance } from './inst'

export default defineComponent({
  name: 'ProUpload',
  props: proUploadProps,
  slots: Object as SlotsType<ProUploadSlots>,
  setup(props, { slots, expose }) {
    const nUploadInstRef = ref<UploadInst>()
    const { proUpload } = useInjectGlobalConfigContext()
    const nUploadSlots = useOmitSlots(slots, proUploadExtendSlotKeys)

    const proFieldProps = useGetProFieldProps(props)
    const field = createField({
      ...proFieldProps,
      defaultValue: [],
      postState: convertValueToFile,
    })

    const {
      title: globalTitle,
      action: globalAction,
      maxSize: globalMaxSize,
      customRequest: globalCustomRequest,
      onBeforeUpload: globalOnBeforeUpload,
      onOverFileMaxSize: globalOnOverFileMaxSize,
    } = proUpload

    const {
      value,
      scope,
      stringPath,
      doUpdateValue,
    } = field

    /**
     * 可在表单组件层编译，也可以在 form-item 中编译
     */
    const compiledFieldProps = useCompile(
      toRef(props, 'fieldProps'),
      { scope },
    )

    /**
     * 自动生成 id
     * 支持文件 url 组成的 fileList 回显
     */
    function convertValueToFile(val: any): UploadFileInfo[] {
      const { postState } = props
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
        maxSize: userMaxSize,
        onOverFileMaxSize: userOnOverFileMaxSize,
      } = props

      const {
        onBeforeUpload: userOnBeforeUpload,
      } = compiledFieldProps.value ?? {}

      const fileSize = data.file.file?.size
      const maxSize = userMaxSize ?? globalMaxSize
      const beforeUpload = userOnBeforeUpload ?? globalOnBeforeUpload
      const onOverFileMaxSize = userOnOverFileMaxSize ?? globalOnOverFileMaxSize

      if (maxSize && fileSize && fileSize > maxSize) {
        onOverFileMaxSize && onOverFileMaxSize(maxSize, data)
        return false
      }

      if (beforeUpload) {
        return beforeUpload(data as any)
      }
      return true
    }

    /**
     * 注入自定义属性，在 pro-form-item 中完善 ProComponentConfig
     */
    field[ProComponentConfigKey] = {
      type: 'ProUpload',
      ruleType: 'array',
      fieldProps: compiledFieldProps,
      slots: computed(() => slots),
      empty: computed(() => !isArray(value.value) || value.value.length <= 0),
    } as Partial<ProComponentConfig>

    const nUploadProps = computed<UploadProps>(() => {
      return {
        ref: nUploadInstRef,
        fileList: value.value,
        onBeforeUpload,
        onUpdateFileList: doUpdateValue,
      }
    })

    const exposed: ProUploadInstance = {
      clear: () => nUploadInstRef.value?.clear(),
      openOpenFileDialog: () => nUploadInstRef.value?.openOpenFileDialog(),
      submit: (...args: any[]) => ((nUploadInstRef.value?.submit) as any)(...args),
    }

    expose(exposed)
    return {
      stringPath,
      globalTitle,
      globalAction,
      nUploadSlots,
      nUploadProps,
      globalCustomRequest,
    }
  },
  render() {
    const {
      $slots,
      $props,
      $attrs,
      stringPath,
      globalTitle,
      globalAction,
      nUploadSlots,
      nUploadProps,
      globalCustomRequest,
    } = this

    return (
      <ProFormItem
        {...$props}
        path={stringPath}
        v-slots={{
          default: ({ fieldProps }: any) => {
            const {
              action,
              listType,
              customRequest,
              ...restProps
            } = fieldProps ?? {}

            return (
              <NUpload
                {...$attrs}
                {...restProps}
                {...nUploadProps}
                listType={listType}
                action={action ?? globalAction}
                customRequest={customRequest ?? globalCustomRequest}
                v-slots={{
                  ...nUploadSlots,
                  default: () => {
                    if ($slots.default) {
                      return $slots.default()
                    }
                    if (listType === 'image-card') {
                      return $props.title ?? globalTitle
                    }
                    return <NButton type="primary">{$props.title ?? globalTitle}</NButton>
                  },
                }}
              />
            )
          },
        }}
      >
      </ProFormItem>
    )
  },
})
</script>
