import type { VNodeChild } from 'vue'

interface fieldGroupRenderParams {
  vnode: VNodeChild
}

export function resolveFieldGroup(
  render: ((params: fieldGroupRenderParams) => VNodeChild) | undefined,
  params: fieldGroupRenderParams,
  defaultRender: () => VNodeChild,
) {
  return render
    ? render(params)
    : defaultRender()
}
