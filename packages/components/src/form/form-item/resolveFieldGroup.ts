import type { VNodeChild } from 'vue'
import type { FieldGroupRender } from './props'

export function resolveFieldGroup(
  fieldGroupRender: FieldGroupRender | undefined,
  params: Parameters<FieldGroupRender>['0'],
  defaultRender: () => VNodeChild,
) {
  return fieldGroupRender
    ? fieldGroupRender(params)
    : defaultRender()
}
