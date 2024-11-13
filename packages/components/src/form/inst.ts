import type { FormInst } from 'naive-ui'
import type { BaseForm, InternalPath } from 'pro-components-hooks'
import type { Simplify } from 'type-fest'
import type { FormItemInternalValidateResult } from './composables/useValidationResult'

export type ProFormInst<Values = any> = Simplify<Pick<
  BaseForm<Values>,
  | 'matchPath'
  | 'getFieldValue'
  | 'getFieldsValue'
  | 'setFieldValue'
  | 'setFieldsValue'
  | 'resetFieldValue'
  | 'resetFieldsValue'
  | 'setInitialValue'
  | 'setInitialValues'
  | 'pauseDependenciesTrigger'
  | 'resumeDependenciesTrigger'
  | 'getFieldsTransformedValue'
> & {
/**
 * 提交表单
 */
  submit: () => void
  /**
   * 还原指定字段值并清空校验
   */
  restoreFieldValue: (path: InternalPath) => void
  /**
   * 还原所有字段值并清空校验
   */
  restoreFieldsValue: () => void
  /**
   * 获取表达式作用域内容
   */
  getScope: () => Record<string, any>
  /**
   * 获取字段值的校验结果
   */
  getFieldValidationResult: (path: InternalPath) => FormItemInternalValidateResult | null
  /**
   * 校验
   */
  validate: (paths?: InternalPath) => ReturnType<FormInst['validate']>
  /**
   * 清空校验
   */
  restoreValidation: (paths?: InternalPath) => ReturnType<FormInst['restoreValidation']>
}>
