import type { FormInst } from 'naive-ui'
import type { BaseForm, Path } from 'pro-components-hooks'
import { createProComponentInstanceFactory } from '../hooks'
import type { FormItemInternalValidateResult } from './composables/useValidateResult'

export type ProFormInst = Pick<
BaseForm,
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
  restoreFieldValue: (path: Path) => void
  /**
   * 还原所有字段值并清空校验
   */
  restoreFieldsValue: () => void
  /**
   * 获取表达式作用域内容
   */
  getScope: () => Record<`$${string}`, any>
  /**
   * 获取字段值的校验结果
   */
  getFieldValidateResult: (path: Path) => FormItemInternalValidateResult | null
  /**
   * 校验
   */
  validate: (paths?: string | string[]) => ReturnType<FormInst['validate']>
  /**
   * 清空校验
   */
  restoreValidation: (paths?: string | string[]) => ReturnType<FormInst['restoreValidation']>
}
export const useProFormInst = createProComponentInstanceFactory<ProFormInst>('ProForm')
