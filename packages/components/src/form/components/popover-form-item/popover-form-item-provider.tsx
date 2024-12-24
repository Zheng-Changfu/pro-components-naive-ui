import type { PopoverProps } from 'naive-ui'
import type { PropType } from 'vue'
import { defineComponent, provide } from 'vue'
import { ProPopoverFormItem } from '.'
import { proFieldConfigInjectionKey } from '../field/context'

export default defineComponent({
  name: 'ProPopoverFormItemProivder',
  props: {
    popoverProps: Object as PropType<PopoverProps>,
  },
  setup(props) {
    provide(proFieldConfigInjectionKey, {
      renderFormItem: (proFormItemProps, proFormItemSlots) => {
        return (
          <ProPopoverFormItem
            {...proFormItemProps}
            popoverProps={props.popoverProps}
            v-slots={proFormItemSlots}
          >
          </ProPopoverFormItem>
        )
      },
    })
  },
  render() {
    return this.$slots.default?.()
  },
})
