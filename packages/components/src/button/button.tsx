import type { SlotsType } from 'vue'
import type { ProButtonSlots } from './slots'
import { NButton, NEl, NTooltip } from 'naive-ui'
import { defineComponent } from 'vue'
import { useOmitProps, useOverrideProps } from '../composables'
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

    const nButtonProps = useOmitProps(
      overridedProps,
      proButtonExtendProps,
    )

    const {
      tooltipProps,
      tooltipTexts,
    } = useTooltip(overridedProps)

    return {
      tooltipProps,
      tooltipTexts,
      nButtonProps,
    }
  },
  render() {
    const {
      $props,
      $attrs,
      $slots,
      nButtonProps,
      tooltipProps,
      tooltipTexts,
    } = this

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
