import type { VNodeChild } from 'vue'
import { inject } from 'vue'
import { proFormContextKey } from '../context'
import type { FormItemRender } from './props'

export function resolveFormItem(
  formItemRender: FormItemRender | undefined,
  params: Parameters<FormItemRender>['0'],
  defaultRender: () => VNodeChild,
) {
  const formPropFormItemRender = inject(proFormContextKey)!.formItemRender
  return formItemRender
    ? formItemRender(params)
    : formPropFormItemRender
      ? formPropFormItemRender(params)
      : defaultRender()
}
