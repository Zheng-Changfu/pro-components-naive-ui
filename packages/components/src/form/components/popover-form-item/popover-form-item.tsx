import type { SlotsType } from 'vue'
import type { ProPopoverFormItemSlots } from './slots'
import { onClickOutside, useEventListener } from '@vueuse/core'
import { NEl, NPopover, useThemeVars } from 'naive-ui'
import { computed, ref, useAttrs } from 'vue'
import { useFieldValidateStatus } from '../field'
import { ProFormItem } from '../form-item'
import { proPopoverFormItemProps } from './props'

export default defineComponent({
  name: 'ProPopoverFormItem',
  inheritAttrs: false,
  props: proPopoverFormItemProps,
  slots: Object as SlotsType<ProPopoverFormItemSlots>,
  setup(props) {
    const attrs = useAttrs()
    const clickInside = ref(true)
    const formItemInstRef = ref()
    const themeVars = useThemeVars()
    const { errors, warnings } = useFieldValidateStatus()
    const formItemEl = computed(() => formItemInstRef.value?.$el as HTMLElement)

    const showPopover = computed(() => {
      const condition1 = !!clickInside.value
      const condition2 = !!errors.value.length || !!warnings.value.length
      return condition1 && condition2
    })

    const feedbackColor = computed(() => {
      const isErrorFeedback = errors.value.length > 0
      return isErrorFeedback
        ? themeVars.value.errorColor
        : themeVars.value.warningColor
    })

    const feedbacks = computed(() => {
      return errors.value.length > 0 ? errors.value : warnings.value
    })

    const proFormItemProps = computed(() => {
      const { popoverProps, ...rest } = props
      return {
        ...attrs,
        ...rest,
      }
    })

    onClickOutside(
      formItemEl,
      () => {
        clickInside.value = false
      },
    )

    useEventListener(
      formItemEl,
      'click',
      () => {
        clickInside.value = true
      },
      { capture: true },
    )

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
        {...popoverProps}
        show={this.showPopover}
      >
        {{
          trigger: () => [
            <ProFormItem
              ref="formItemInstRef"
              {...this.proFormItemProps}
              v-slots={this.$slots}
            />,
          ],
          default: () => [
            this.feedbacks.map((f) => {
              return (
                <NEl
                  key={f.message}
                  style={{ color: this.feedbackColor }}
                >
                  { f.message }
                </NEl>
              )
            }),
          ],
        }}
      </NPopover>
    )
  },
})
