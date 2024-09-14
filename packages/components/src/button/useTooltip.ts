import type { TooltipProps } from 'naive-ui'
import type { ProButtonProps } from './props'
import { isArray } from 'lodash-es'
import { computed } from 'vue'

export function useTooltip(props: ComputedRef<ProButtonProps>) {
  const disabled = computed(() => {
    const { tooltip, disabled, disabledTooltip } = props.value
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
    const { tooltip, disabled, disabledTooltip } = props.value
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
