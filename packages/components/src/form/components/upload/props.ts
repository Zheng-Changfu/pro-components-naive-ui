import type { UploadFileInfo, UploadProps } from 'naive-ui'
import type { ExtractPublicPropTypes, MaybeRefOrGetter, PropType } from 'vue'
import type { MaybeExpression } from 'pro-components-hooks'
import { proFormItemProps } from '../../form-item'
import { proFieldProps } from '../../field'
import type { ExtendPublicProps } from '../../../types'

export interface ProUploadFieldProps extends UploadProps {
  /**
   * 按钮文本，优先级低于插槽
   */
  title?: MaybeRefOrGetter<string>
  /**
   * 文件的最大大小，单位 kb
   */
  maxSize?: number
  /**
   * 是否只允许上传图片类型
   * @default false
   */
  onlyAcceptImage?: boolean
  /**
   * 超出文件最大大小时触发的回调
   */
  onOverFileMaxSize?: (maxSize: number, data: {
    file: UploadFileInfo
    fileList: UploadFileInfo[]
  }) => void
  /**
   * 上传不支持类型文件时触发的回调
   */
  onUnAccpetType?: (data: {
    file: UploadFileInfo
    fileList: UploadFileInfo[]
  }) => void
}

export const proUploadProps = {
  /**
   * 继承属性
   */
  ...proFormItemProps,
  /**
   * 额外的字段属性
   */
  ...proFieldProps,
  fieldProps: {
    type: Object as PropType<MaybeExpression<ExtendPublicProps<Omit<
      ProUploadFieldProps,
      | 'fileList'
      | 'defaultFileList'
      | 'onUpdate:fileList'
      | 'onUpdateFileList'
    >>>>,
    default: () => ({}),
  },
} as const

export type ProUploadProps = ExtractPublicPropTypes<typeof proUploadProps>
