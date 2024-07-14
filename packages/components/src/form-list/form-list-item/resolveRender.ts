import type { VNodeChild } from 'vue'
import type { ActionRender, ItemRender } from '../props'

export function resolveItem(
  itemRender: ItemRender | undefined,
  params: Parameters<ItemRender>['0'],
  defaultRender: () => VNodeChild,
) {
  return itemRender
    ? itemRender(params)
    : defaultRender()
}

export function resolveAction(
  actionRender: ActionRender | undefined,
  params: Parameters<ActionRender>['0'],
  defaultRender: () => VNodeChild,
) {
  return actionRender
    ? actionRender(params)
    : defaultRender()
}

export function resolveCopyButtonRender() {

}
