import type { VNodeChild } from 'vue'

interface RenderFieldParams {
  bindSlots: Record<string, any>
  bindValues: Record<string, any>
}
export function resolveField(
  render: ((opts: RenderFieldParams) => VNodeChild) | undefined,
  params: RenderFieldParams,
  defaultRender: () => VNodeChild,
) {
  return render
    ? render(params)
    : defaultRender()
}
