import type { UploadFileInfo, UploadProps } from 'naive-ui'
import type { ExtractPublicPropTypes, PropType } from 'vue'
import type { MaybeExpression } from 'pro-components-hooks'
import { proFieldProps, proFormItemProps } from '../form'

export const proUploadExtendProps = {
  /**
   * 按钮文本，优先级低于插槽
   */
  title: String,
  /**
   * 文件的最大大小，单位 kb
   */
  maxSize: Number,
  /**
   * 超出文件最大大小时触发的回调
   */
  onOverFileMaxSize: {
    type: Function as PropType<(maxSize: number, data: {
      file: UploadFileInfo
      fileList: UploadFileInfo[]
    }) => void>,
  },
} as const

export const proUploadProps = {
  /**
   * 继承属性
   */
  ...proFormItemProps,
  /**
   * 额外的字段属性
   */
  ...proFieldProps,
  ...proUploadExtendProps,
  fieldProps: {
    type: Object as PropType<MaybeExpression<Omit<
      UploadProps,
      | 'fileList'
      | 'defaultFileList'
      | 'onUpdate:fileList'
      | 'onUpdateFileList'
    >>>,
    default: () => ({}),
  },
} as const

export type ProUploadProps = ExtractPublicPropTypes<typeof proUploadProps>
export type ProUploadExtendProps = ExtractPublicPropTypes<typeof proUploadExtendProps>
