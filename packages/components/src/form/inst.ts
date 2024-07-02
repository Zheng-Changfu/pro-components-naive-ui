import type { FormInst } from 'naive-ui'
import type { BaseForm } from 'pro-components-hooks'

export type ProFormInstance<Data = any> = Pick<
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
  submit: () => Promise<Data>
  validate: (paths?: string | string[]) => ReturnType<FormInst['validate']>
  restoreValidation: (paths?: string | string[]) => ReturnType<FormInst['restoreValidation']>
}
