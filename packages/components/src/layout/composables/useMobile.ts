import { useBreakpoint } from 'vooks'
import { computed } from 'vue'

export function useMobile() {
  const breakpoint = useBreakpoint()
  return computed(() => {
    return breakpoint.value === 'xs'
  })
}
