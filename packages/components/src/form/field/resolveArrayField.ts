import type { VNodeChild } from 'vue'
import type { ArrayFieldRender } from '../../form-list/props'

export function resolveArrayField(
  fieldRender: ArrayFieldRender | undefined,
  params: Parameters<ArrayFieldRender>['0'],
  defaultRender: () => VNodeChild,
) {
  return fieldRender
    ? fieldRender(params)
    : defaultRender()
}
