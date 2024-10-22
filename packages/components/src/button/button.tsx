import type { SlotsType } from 'vue'
import type { ProButtonSlots } from './slots'
import { NButton } from 'naive-ui'
import { defineComponent } from 'vue'
import ProTooltip from '../_internal/components/pro-tooltip'
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
    } = useTooltip(overridedProps)

    return {
      tooltipProps,
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
    } = this

    return (
      <ProTooltip {...tooltipProps}>
        {{
          trigger: () => (
            <NButton
              {...$attrs}
              {...nButtonProps}
              v-slots={{
                ...$slots,
                default: () => $props.content ?? $slots.default?.(),
              }}
            />
          ),
        }}
      </ProTooltip>
    )
  },
})
