import type { Merge, Simplify } from 'type-fest'
import type { VNodeChild } from 'vue'
import type { ValidateError } from '../../props'
import type { ProFormItemProps } from '../form-item'

export interface ProFieldSlots<InputProps = Record<string, any>> {
  /**
   * form-item label 插槽
   */
  'label': any
  /**
   * form-item feedback 插槽
   */
  'feedback': any
  /**
   * 自定义表单项
   */
  'input': InputProps
  /**
   * 自定义 form-item
   * @param feedbackColor 验证的反馈颜色（warning 和 error 颜色内部处理）
   * @param errors 验证的错误信息列表
   * @param warnings 验证的警告信息列表
   * @param feedbacks 验证的反馈信息（warning 和 error 信息列表内部处理）
   * @param proFormItemDom pro-form-item 节点（如果校验效果是 popover，那么是 pro-popover-form-item，否则是 pro-form-item）
   * @param proFormItemProps 应该传递给 pro-form-item 的 props
   */
  'form-item': {
    feedbackColor: string
    errors: ValidateError[]
    warnings: ValidateError[]
    feedbacks: ValidateError[]
    proFormItemDom: VNodeChild
    proFormItemProps: ProFormItemProps
  }
}

interface ProFieldInputSlotsType<InputProps extends object> {
  /**
   * 是否为只读模式
   */
  readonly: boolean
  /**
   * 表单项节点（会根据 readonly 自动切换）
   */
  inputDom: VNodeChild
  /**
   * 传递给表单项的所有 props
   */
  inputProps: InputProps
}

export type ProFieldSharedSlots<InputProps extends object> = Merge<
  ProFieldSlots,
  {
    input: Simplify<ProFieldInputSlotsType<InputProps>>
  }
>
