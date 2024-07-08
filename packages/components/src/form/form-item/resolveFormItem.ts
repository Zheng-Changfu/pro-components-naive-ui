import type { VNodeChild } from 'vue'
import { inject } from 'vue'
import type { FormItemProps } from 'naive-ui'
import { proFormRenderFormItemContextKey } from '../context'

interface RenderFormItemParams {
  bindValues: FormItemProps
  bindSlots: Record<string, any>
}

export function resolveFormItem(
  renderFormItem: ((params: RenderFormItemParams) => VNodeChild) | undefined,
  params: RenderFormItemParams,
  defaultRender: () => VNodeChild,
) {
  const formRenderFormItem = inject(proFormRenderFormItemContextKey)
  return renderFormItem
    ? renderFormItem(params)
    : formRenderFormItem
      ? formRenderFormItem(params)
      : defaultRender()
}
