import type { VNodeChild } from 'vue'
import type { RequestTipConfig } from 'pro-components-hooks'
import type { FormValidateMessages } from 'naive-ui/es/form/src/interface'
import type { ProFieldConfig, ProUploadFieldProps } from '../form'

export type ProFieldGlobalConfig = ProFieldConfig

export interface GlobalConfigProForm {
  /**
   * 自定义渲染只读状态下的表单
   */
  renderReadonly: (options: ProFieldGlobalConfig) => VNodeChild
  /**
   * 自定义渲染只读模式下并且表单值为空时的内容
   */
  renderReadonlyEmpty: (options: ProFieldGlobalConfig) => VNodeChild
  /**
   * 渲染表单控件的 placeholder
   */
  renderPlaceholder: (options: ProFieldGlobalConfig) => string | [string, string]
  /**
   * 获取验证规则模版（目前只处理了 required:true）
   */
  getValidateMessages: (options: ProFieldGlobalConfig) => FormValidateMessages
  /**
   * 统一设置表单校验时机
   * @default 'input'
   */
  validateTrigger: string | string[]
  /**
   * form 表单可以读取到的表达式作用域
   */
  expressionScope: Record<`$${string}`, any>
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

interface DateValueFormat {
  valueFormat: string
}

export type GlobalConfigProTime = DateValueFormat
export type GlobalConfigProDateYear = DateValueFormat
export type GlobalConfigProDateWeek = DateValueFormat
export type GlobalConfigProDateMonth = DateValueFormat
export type GlobalConfigProDateQuarter = DateValueFormat
export type GlobalConfigProDateYearRange = DateValueFormat
export type GlobalConfigProDateMonthRange = DateValueFormat
export type GlobalConfigProDateQuarterRange = DateValueFormat
export type GlobalConfigProDate = DateValueFormat & { valueFormatIfShowTime: string }
export type GlobalConfigProDateRange = DateValueFormat & { valueFormatIfShowTime: string }

export type GlobalConfigProRequest = RequestTipConfig
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
