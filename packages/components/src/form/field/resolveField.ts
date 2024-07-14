import type { VNodeChild } from 'vue'
import type { FieldRender } from '../form-item'

export function resolveField(
  fieldRender: FieldRender | undefined,
  params: Parameters<FieldRender>['0'],
  defaultRender: () => VNodeChild,
) {
  return fieldRender
    ? fieldRender(params)
    : defaultRender()
}
