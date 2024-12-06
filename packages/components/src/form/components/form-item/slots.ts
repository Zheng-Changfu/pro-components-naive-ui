import type { VNodeChild } from 'vue'
import type { ValidateError } from '../../props'

export interface ProFormItemSlots {
  label: any
  default: any
  feedback: {
    /**
     * 表单项验证的错误信息列表
     */
    errors: ValidateError[]
    /**
     * 表单项验证的警告信息列表
     */
    warnings: ValidateError[]
    /**
     * 表单项验证的反馈信息（warning 和 error 信息内部完成）
     */
    feedbacks: ValidateError[]
    /**
     * 表单项验证的反馈信息颜色（warning 和 error 颜色内部完成）
     */
    feedbackColor: string
    /**
     * 反馈信息虚拟 dom
     */
    feedbackDom: VNodeChild
  }
}
