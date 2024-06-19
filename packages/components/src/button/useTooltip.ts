import { computed } from 'vue'
import type { TooltipProps } from 'naive-ui'
import { isArray } from 'lodash-es'
import type { ProButtonProps } from './props'

export function useTooltip<T extends ProButtonProps>(props: T) {
  const disabled = computed(() => {
    const { tooltip, disabledTooltip } = props
    return !tooltip && !disabledTooltip
  })

  const tooltipProps = computed<TooltipProps>(() => {
    return {
      trigger: 'hover',
      disabled: disabled.value,
    }
  })

  function normalizeTooltip(tip: string | string[] | undefined) {
    return isArray(tip)
      ? tip
      : [tip].filter(Boolean) as string[]
  }

  const tooltipTexts = computed(() => {
    const { tooltip, disabled, disabledTooltip } = props
    if (disabled && disabledTooltip) {
      return normalizeTooltip(disabledTooltip)
    }
    if (tooltip) {
      return normalizeTooltip(tooltip)
    }
    return []
  })

  return {
    tooltipProps,
    tooltipTexts,
  }
}
