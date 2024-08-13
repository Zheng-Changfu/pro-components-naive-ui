import type { VNodeChild } from 'vue'
import type { FieldExtraInfo } from '../form/components/field'
import type { ProUploadFieldProps } from '../form/components/upload'

export interface GlobalConfigProForm {
  /**
   * 自定义渲染只读模式下并且表单值为空时的内容
   */
  renderReadonlyEmpty: (opt: FieldExtraInfo) => VNodeChild
  /**
   * 统一设置表单校验时机
   * @default 'input'
   */
  validateTrigger: string | string[]
  /**
   * form 表单可以读取到的表达式作用域
   */
  scope: Record<`$${string}`, any>
}

export interface GlobalConfigProButton {
  /**
   * 按钮权限数据
   */
  authData: any
  /**
   * 是否有权限
   * @returns 返回 false, 则隐藏按钮
   */
  hasAuth: (auth: any, authData: any) => boolean
}

export type GlobalConfigProUpload = Pick<
  ProUploadFieldProps,
  | 'title'
  | 'action'
  | 'maxSize'
  | 'customRequest'
  | 'onBeforeUpload'
  | 'onUnAccpetType'
  | 'onOverFileMaxSize'
>

export interface GlobalConfigProTable {

}
