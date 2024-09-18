import type { ButtonProps } from 'naive-ui'
import type { SlotsType } from 'vue'
import type { ProButtonSlots } from './slots'
import { NButton, NEl, NTooltip } from 'naive-ui'
import { computed, defineComponent } from 'vue'
import { useOmitProps, useOverrideProps } from '../composables'
import { useLoading } from './composables/useLoading'
import { useTooltip } from './composables/useTooltip'
import { proButtonExtendProps, proButtonProps } from './props'

const name = 'ProButton'
export default defineComponent({
  name,
  inheritAttrs: false,
  props: proButtonProps,
  slots: Object as SlotsType<ProButtonSlots>,
  setup(props) {
    const overridedProps = useOverrideProps(
      name,
      props,
    )

    const buttonProps = useOmitProps(
      overridedProps,
      proButtonExtendProps,
    )

    const {
      loading,
      clickLoading,
    } = useLoading(overridedProps)

    const {
      tooltipProps,
      tooltipTexts,
    } = useTooltip(overridedProps)

    // const {
    //   pass,
    // } = useAuth(overridedProps)

    const nButtonProps = computed<ButtonProps>(() => {
      return {
        ...buttonProps.value,
        loading: loading.value,
        onClick: clickLoading,
      }
    })

    return {
      // pass,
      tooltipProps,
      tooltipTexts,
      nButtonProps,
    }
  },
  render() {
    const {
      // pass,
      $props,
      $attrs,
      $slots,
      nButtonProps,
      tooltipProps,
      tooltipTexts,
    } = this

    // if (!pass) {
    //   return null
    // }

    return (
      <NTooltip
        {...tooltipProps}
        v-slots={{
          trigger: () => [
            <NButton
              {...$attrs}
              {...nButtonProps}
              v-slots={{
                ...$slots,
                default: () => [
                  $props.content ?? $slots.default?.(),
                ],
              }}
            />,
          ],
          default: () => [
            tooltipTexts.map((t, i) => {
              return <NEl key={i}>{t}</NEl>
            }),
          ],
        }}
      />
    )
  },
})
