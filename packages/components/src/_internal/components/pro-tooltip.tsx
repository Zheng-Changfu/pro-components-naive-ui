import type { ExtractPublicPropTypes, PropType, SlotsType } from 'vue'
import { isString } from 'lodash-es'
import { NEl, NTooltip, tooltipProps } from 'naive-ui'
import { defineComponent } from 'vue'
import { resolveWrappedSlot } from '../../_utils/resolve-slot'

export const proTooltipProps = {
  ...tooltipProps,
  tooltip: [String, Array] as PropType<string | string[]>,
} as const

export type ProTooltipProps = ExtractPublicPropTypes<typeof proTooltipProps>

export default defineComponent({
  name: 'ProTooltip',
  props: proTooltipProps,
  slots: Object as SlotsType<{
    trigger: any
    footer: any
    header: any
    default: any
  }>,
  setup(props) {
    const normalizeTootlip = computed<string[]>(() => {
      const { tooltip } = props
      if (!tooltip) {
        return []
      }
      return isString(tooltip) ? [tooltip] : tooltip
    })

    return {
      normalizeTootlip,
    }
  },
  render() {
    const {
      tooltip,
      ...nTooltipProps
    } = this.$props

    if (this.normalizeTootlip.length <= 0) {
      return this.$slots.trigger?.()
    }

    return (
      <NTooltip {...nTooltipProps}>
        {{
          ...this.$slots,
          default: () => {
            return resolveWrappedSlot(this.$slots.default, (children) => {
              return children ?? this.normalizeTootlip.map(tip => <NEl key={tip}>{tip}</NEl>)
            })
          },
        }}
      </NTooltip>
    )
  },
})
