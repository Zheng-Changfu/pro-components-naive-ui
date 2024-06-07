import type { FormInst } from 'naive-ui'
import type { BaseForm } from 'pro-components-hooks'

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
> & FormInst
