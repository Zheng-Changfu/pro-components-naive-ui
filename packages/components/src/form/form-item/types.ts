import type { FormItemRule } from 'naive-ui'
import type { MaybeExpression } from 'pro-components-hooks'
import type { FormItemRuleValidatorParams } from 'naive-ui/es/form/src/interface'

export interface ProFormItemRule extends FormItemRule {
  /**
   * 什么时候发生错误，支持表达式
   * @returns 显示错误
   */
  whenError?: MaybeExpression<boolean> | ((...args: FormItemRuleValidatorParams) => boolean)
}
