import type { VNodeChild } from 'vue'
import { inject } from 'vue'
import type { FormItemProps } from 'naive-ui'
import { proFormItemRenderContextKey } from '../context'

interface FormItemRenderParams {
  bindValues: FormItemProps
  bindSlots: Record<string, any>
}

export function resolveFormItem(
  formItemRender: ((params: FormItemRenderParams) => VNodeChild) | undefined,
  params: FormItemRenderParams,
  defaultRender: () => VNodeChild,
) {
  const formPropFormItemRender = inject(proFormItemRenderContextKey)
  return formItemRender
    ? formItemRender(params)
    : formPropFormItemRender
      ? formPropFormItemRender(params)
      : defaultRender()
}
