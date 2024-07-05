import type { FormInst } from 'naive-ui'
import type { BaseForm } from 'pro-components-hooks'
import { createProComponentInstanceFactory } from '../hooks'

export type ProFormInstance = Pick<
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
| 'getFieldsTransformedValue'
> & {
  submit: () => void
  validate: (paths?: string | string[]) => ReturnType<FormInst['validate']>
  restoreValidation: (paths?: string | string[]) => ReturnType<FormInst['restoreValidation']>
}
export const useProFormInstance = createProComponentInstanceFactory<ProFormInstance>('ProForm')
