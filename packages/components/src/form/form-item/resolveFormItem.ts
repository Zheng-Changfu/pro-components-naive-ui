import type { VNodeChild } from 'vue'
import { inject } from 'vue'
import { proFormItemRenderContextKey } from '../context'
import type { FormItemRender } from './props'

export function resolveFormItem(
  formItemRender: FormItemRender | undefined,
  params: Parameters<FormItemRender>['0'],
  defaultRender: () => VNodeChild,
) {
  const formPropFormItemRender = inject(proFormItemRenderContextKey)
  return formItemRender
    ? formItemRender(params)
    : formPropFormItemRender
      ? formPropFormItemRender(params)
      : defaultRender()
}
