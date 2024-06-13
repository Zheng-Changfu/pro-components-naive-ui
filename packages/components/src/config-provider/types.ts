import type { VNodeChild } from 'vue'
import type { ProComponentConfig } from '../form'

export type ProComponentGlobalConfig = ProComponentConfig

export interface GlobalConfigProForm {
  /**
   * 自定义渲染只读状态下的表单
   * @param value 当前值
   */
  readonlyRender: (options: ProComponentGlobalConfig) => VNodeChild
  /**
   * 自定义渲染只读模式下并且表单值为空时的内容
   */
  readonlyEmptyRender: (options: ProComponentGlobalConfig) => VNodeChild
  /**
   * 配置表单控件的 placeholder
   */
  placeholderRender: (options: ProComponentGlobalConfig) => any
  /**
   * 自定义渲染校验信息（目前只处理了 required:true），后续有可能会重构成一套完整的验证模版
   * @param value 当前值
   */
  validateMessageRender: (options: ProComponentGlobalConfig) => VNodeChild
  /**
   * 统一设置表单校验时机
   * @default 'input'
   */
  validateTrigger: string | string[]
  /**
   * form 表单可以读取到的上下文
   */
  expressionContext: Record<string, any>
}

export interface GlobalConfigProButton {
  /**
   * 按钮权限
   */
  auth: any
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

export interface GlobalConfigProRequest {
  /**
   * 用什么形式去提示
   * @param type 请求结果
   * @param tipText 用户提供的文案，如果提供的是 false，则不会触发该函数调用
   * @param dataOrError 成功则为请求返回的结果，失败则为错误信息
   */
  tipApi: (type: 'success' | 'error', tipText: string, dataOrError: any) => void
  /**
   * 请求成功后的提示，false 则不提示
   */
  successTip: string | false | ((responseData: any) => string | false)
  /**
   * 请求失败后的提示，false 则不提示
   */
  failureTip: string | false | ((error: any) => string | false)
}

export interface GlobalConfigProTable {

}

export interface GlobalConfigProUpload {

}
