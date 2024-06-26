import { computed } from 'vue'
import type { TooltipProps } from 'naive-ui'
import { isArray } from 'lodash-es'
import type { ProButtonProps } from './props'

export function useTooltip(props: ProButtonProps) {
  const disabled = computed(() => {
    const { tooltip, disabled, disabledTooltip } = props
    return disabled ? !disabledTooltip : !tooltip
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
