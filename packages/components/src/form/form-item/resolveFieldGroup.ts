import type { VNodeChild } from 'vue'

interface RenderFieldGroupParams {
  vnode: VNodeChild
}

export function resolveFieldGroup(
  renderFieldGroup: ((params: RenderFieldGroupParams) => VNodeChild) | undefined,
  params: RenderFieldGroupParams,
  defaultRender: () => VNodeChild,
) {
  return renderFieldGroup
    ? renderFieldGroup(params)
    : defaultRender()
}
