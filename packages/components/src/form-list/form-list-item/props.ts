import type { PropType } from 'vue'
import type { ActionGuard, ActionRender, ItemRender } from '../props'
import type { ProButtonProps } from '../../button'

export const proFormListItemProps = {
  index: {
    type: Number,
    required: true,
  },
  min: Number,
  max: Number,
  itemRender: Function as PropType<ItemRender>,
  actionRender: Function as PropType<ActionRender>,
  actionGuard: Object as PropType<Partial<ActionGuard>>,
  copyButtonProps: {
    type: [Object, Boolean] as PropType<ProButtonProps | false>,
    default: undefined,
  },
  removeButtonProps: {
    type: [Object, Boolean] as PropType<ProButtonProps | false>,
    default: undefined,
  },
} as const
