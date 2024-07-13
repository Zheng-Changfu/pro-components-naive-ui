import type { VNodeChild } from 'vue'

interface FieldRenderParams {
  bindSlots: Record<string, any>
  bindValues: Record<string, any>
}
export function resolveField(
  render: ((opts: FieldRenderParams) => VNodeChild) | undefined,
  params: FieldRenderParams,
  defaultRender: () => VNodeChild,
) {
  return render
    ? render(params)
    : defaultRender()
}
