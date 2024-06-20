import type { UploadFileInfo, UploadProps } from 'naive-ui'
import type { ExtractPublicPropTypes, PropType } from 'vue'
import type { MaybeExpression } from 'pro-components-hooks'
import { proFieldProps, proFormItemProps } from '../form'

export interface ProUploadFieldProps extends Omit<
UploadProps,
| 'fileList'
| 'defaultFileList'
| 'onUpdate:fileList'
| 'onUpdateFileList'
> {
  /**
   * 按钮文本，优先级低于插槽
   */
  title?: string
  /**
   * 文件的最大大小，单位 kb
   */
  maxSize?: number
  /**
   * 超出文件最大大小时触发的回调
   */
  onOverFileMaxSize?: (maxSize: number, data: {
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
    type: Object as PropType<MaybeExpression<ProUploadFieldProps>>,
    default: () => ({}),
  },
} as const

export type ProUploadProps = ExtractPublicPropTypes<typeof proUploadProps>
