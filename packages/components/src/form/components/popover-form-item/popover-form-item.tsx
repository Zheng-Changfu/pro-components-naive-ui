import type { SlotsType } from 'vue'
import type { ProPopoverFormItemSlots } from './slots'
import { NPopover } from 'naive-ui'
import { computed, defineComponent, ref, useAttrs } from 'vue'
import { useFieldUtils } from '../field/composables/useFieldUtils'
import { ProFormItem } from '../form-item'
import { proPopoverFormItemProps } from './props'

export default defineComponent({
  name: 'ProPopoverFormItem',
  inheritAttrs: false,
  props: proPopoverFormItemProps,
  slots: Object as SlotsType<ProPopoverFormItemSlots>,
  setup(props) {
    const attrs = useAttrs()
    const formItemInstRef = ref()
    const { feedbacks, feedbackColor } = useFieldUtils()

    const showPopover = computed(() => {
      return feedbacks.value.length > 0
    })

    const proFormItemProps = computed(() => {
      const { popoverProps, ...rest } = props
      return {
        ...attrs,
        ...rest,
      }
    })

    return {
      feedbacks,
      showPopover,
      feedbackColor,
      formItemInstRef,
      proFormItemProps,
    }
  },
  render() {
    const popoverProps = this.$props.popoverProps ?? {}
    return (
      <NPopover
        placement="top-start"
        show={this.showPopover}
        {...popoverProps}
      >
        {{
          trigger: () => {
            return (
              <ProFormItem
                ref="formItemInstRef"
                {...this.proFormItemProps}
                v-slots={this.$slots}
              >
              </ProFormItem>
            )
          },
          default: () => {
            return this.feedbacks.map((f) => {
              return (
                <div
                  key={f.message}
                  style={{ color: this.feedbackColor }}
                >
                  { f.message }
                </div>
              )
            })
          },
        }}
      </NPopover>
    )
  },
})
