import type { PropType, SlotsType } from 'vue'
import { isString } from 'lodash-es'
import { NEl, NTooltip, tooltipProps } from 'naive-ui'
import { defineComponent } from 'vue'
import { resolveWrappedSlot } from '../../_utils/resolve-slot'

export default defineComponent({
  name: 'ProTooltip',
  props: {
    ...tooltipProps,
    tooltip: [String, Array] as PropType<string | string[]>,
  },
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
    const { tooltip, ...nTooltipProps } = this.$props
    return (
      <NTooltip {...nTooltipProps}>
        {{
          ...this.$slots,
          default: () => {
            return resolveWrappedSlot(this.$slots.default, (children) => {
              if (children) {
                return children
              }
              return this.normalizeTootlip
                .map(tip => <NEl key={tip}>{tip}</NEl>)
            })
          },
        }}
      </NTooltip>
    )
  },
})
